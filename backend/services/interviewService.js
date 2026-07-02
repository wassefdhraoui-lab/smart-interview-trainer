import pool from "../database/db.js";
import { evaluateAnswer } from "./githubAiService.js";

export async function loadInterviewOptions() {
  const categories = await pool.query(
    "SELECT id, name FROM categories ORDER BY id"
  );

  const difficulties = await pool.query(
    "SELECT id, name FROM difficulties ORDER BY id"
  );

  const answerModes = await pool.query(
    "SELECT id, name FROM answer_modes ORDER BY id"
  );

  return {
    success: true,
    categories: categories.rows,
    difficulties: difficulties.rows,
    answerModes: answerModes.rows,
  };
}

export async function createInterviewSession(
  userId,
  categoryId,
  difficultyId,
  questionCount,
  answerModeId
) {
  const result = await pool.query(
    `
      INSERT INTO interview_sessions (
        user_id,
        category_id,
        difficulty_id,
        question_count,
        answer_mode_id,
        status,
        started_at
      )
      VALUES ($1, $2, $3, $4, $5, 'in_progress', NOW())
      RETURNING *
    `,
    [userId, categoryId, difficultyId, questionCount, answerModeId]
  );

  return {
    success: true,
    session: result.rows[0],
  };
}

export async function loadSessionQuestions(sessionId) {
  const sessionResult = await pool.query(
    `
      SELECT
        interview_sessions.id,
        interview_sessions.category_id,
        interview_sessions.difficulty_id,
        interview_sessions.question_count,
        categories.name AS category,
        difficulties.name AS difficulty,
        answer_modes.name AS answer_mode
      FROM interview_sessions
      JOIN categories
        ON categories.id = interview_sessions.category_id
      JOIN difficulties
        ON difficulties.id = interview_sessions.difficulty_id
      JOIN answer_modes
        ON answer_modes.id = interview_sessions.answer_mode_id
      WHERE interview_sessions.id = $1
    `,
    [sessionId]
  );

  if (sessionResult.rows.length === 0) {
    return {
      success: false,
      message: "Session not found",
    };
  }

  const session = sessionResult.rows[0];

  const questionsResult = await pool.query(
    `
      SELECT
        questions.id,
        questions.question_text,
        COALESCE(answers.user_answer, '') AS user_answer
      FROM questions
      LEFT JOIN answers
        ON answers.question_id = questions.id
        AND answers.session_id = $3
      WHERE questions.category_id = $1
      AND questions.difficulty_id = $2
      ORDER BY RANDOM()
      LIMIT $4
    `,
    [
      session.category_id,
      session.difficulty_id,
      sessionId,
      session.question_count,
    ]
  );

  return {
    success: true,
    session,
    questions: questionsResult.rows,
  };
}

export async function saveAnswer(
  sessionId,
  questionId,
  questionOrder,
  userAnswer,
  completeInterview
) {
  const sessionResult = await pool.query(
    `
      SELECT
        interview_sessions.question_count,
        answer_modes.name AS answer_mode,
        categories.name AS category,
        difficulties.name AS difficulty
      FROM interview_sessions
      JOIN answer_modes
        ON answer_modes.id = interview_sessions.answer_mode_id
      JOIN categories
        ON categories.id = interview_sessions.category_id
      JOIN difficulties
        ON difficulties.id = interview_sessions.difficulty_id
      WHERE interview_sessions.id = $1
    `,
    [sessionId]
  );

  if (sessionResult.rows.length === 0) {
    return {
      success: false,
      message: "Session not found",
    };
  }

  const session = sessionResult.rows[0];

  const questionResult = await pool.query(
    `
      SELECT question_text, sample_answer, keywords
      FROM questions
      WHERE id = $1
    `,
    [questionId]
  );

  if (questionResult.rows.length === 0) {
    return {
      success: false,
      message: "Question not found",
    };
  }

  const question = questionResult.rows[0];

  let aiFeedback;

  try {
    aiFeedback = await evaluateAnswer(
      question.question_text,
      userAnswer,
      session.category,
      session.difficulty
    );
  } catch (error) {
    console.error("AI feedback failed:", error);

    aiFeedback = {
      overall_score: 0,
      communication_score: 0,
      technical_score: 0,
      confidence_score: 0,
      feedback: "AI feedback could not be generated.",
      missing_concepts: [],
      strengths: [],
      weaknesses: ["Feedback generation failed."],
      improved_answer: "",
    };
  }

  const score = aiFeedback.overall_score || 0;
  const answerFeedback = aiFeedback.feedback || "";
  const missedKeywords = aiFeedback.missing_concepts || [];

  const communicationScore = aiFeedback.communication_score || 0;
  const technicalScore = aiFeedback.technical_score || 0;
  const confidenceScore = aiFeedback.confidence_score || 0;
  const strengths = aiFeedback.strengths || [];
  const weaknesses = aiFeedback.weaknesses || [];
  const improvedAnswer = aiFeedback.improved_answer || "";

  const existingAnswer = await pool.query(
    `
      SELECT id
      FROM answers
      WHERE session_id = $1
      AND question_id = $2
    `,
    [sessionId, questionId]
  );

  let answerResult;

  if (existingAnswer.rows.length > 0) {
    answerResult = await pool.query(
      `
        UPDATE answers
        SET
          question_order = $3,
          user_answer = $4,
          score = $5,
          feedback = $6,
          missed_keywords = $7::json,
          communication_score = $8,
          technical_score = $9,
          confidence_score = $10,
          strengths = $11::json,
          weaknesses = $12::json,
          improved_answer = $13,
          answered_at = NOW()
        WHERE session_id = $1
        AND question_id = $2
        RETURNING *
      `,
      [
        sessionId,
        questionId,
        questionOrder,
        userAnswer,
        score,
        answerFeedback,
        JSON.stringify(missedKeywords),
        communicationScore,
        technicalScore,
        confidenceScore,
        JSON.stringify(strengths),
        JSON.stringify(weaknesses),
        improvedAnswer,
      ]
    );
  } else {
    answerResult = await pool.query(
      `
        INSERT INTO answers (
          session_id,
          question_id,
          question_order,
          user_answer,
          answer_mode,
          score,
          feedback,
          missed_keywords,
          communication_score,
          technical_score,
          confidence_score,
          strengths,
          weaknesses,
          improved_answer,
          answered_at
        )
        VALUES (
          $1, $2, $3, $4, $5,
          $6, $7, $8::json,
          $9, $10, $11,
          $12::json, $13::json, $14,
          NOW()
        )
        RETURNING *
      `,
      [
        sessionId,
        questionId,
        questionOrder,
        userAnswer,
        session.answer_mode,
        score,
        answerFeedback,
        JSON.stringify(missedKeywords),
        communicationScore,
        technicalScore,
        confidenceScore,
        JSON.stringify(strengths),
        JSON.stringify(weaknesses),
        improvedAnswer,
      ]
    );
  }

  const completed = completeInterview;

  if (completed) {
    const averageResult = await pool.query(
      `
        SELECT AVG(score) AS average_score
        FROM answers
        WHERE session_id = $1
      `,
      [sessionId]
    );

    const totalScore = Math.round(
      Number(averageResult.rows[0].average_score)
    );

    const generalFeedback =
      totalScore >= 60
        ? "Good job. You understood the main concepts and gave relevant answers."
        : "You need more practice. Try to include more important technical concepts in your answers.";

    await pool.query(
      `
        UPDATE interview_sessions
        SET
          status = 'completed',
          completed_at = NOW(),
          total_score = $2,
          general_feedback = $3
        WHERE id = $1
      `,
      [sessionId, totalScore, generalFeedback]
    );
  }

  return {
    success: true,
    answer: answerResult.rows[0],
    completed,
  };
}

export async function deleteInterviewSession(sessionId) {
  await pool.query("DELETE FROM answers WHERE session_id = $1", [sessionId]);

  await pool.query("DELETE FROM interview_sessions WHERE id = $1", [sessionId]);

  return {
    success: true,
  };
}

export async function loadFeedback(sessionId) {
  const sessionResult = await pool.query(
    `
      SELECT
        interview_sessions.id,
        COALESCE(interview_sessions.total_score, 0)::int AS total_score,
        COALESCE(interview_sessions.general_feedback, '') AS general_feedback,
        interview_sessions.question_count,
        answer_modes.name AS answer_mode,
        categories.name AS category,
        difficulties.name AS difficulty
      FROM interview_sessions
      JOIN answer_modes
        ON answer_modes.id = interview_sessions.answer_mode_id
      JOIN categories
        ON categories.id = interview_sessions.category_id
      JOIN difficulties
        ON difficulties.id = interview_sessions.difficulty_id
      WHERE interview_sessions.id = $1
    `,
    [sessionId]
  );

  if (sessionResult.rows.length === 0) {
    return {
      success: false,
      message: "Session not found",
    };
  }

  const answersResult = await pool.query(
    `
      SELECT
        answers.question_order,
        questions.question_text,
        COALESCE(questions.sample_answer, '') AS sample_answer,
        COALESCE(answers.user_answer, '') AS user_answer,
        COALESCE(answers.score, 0)::int AS score,
        COALESCE(answers.feedback, '') AS feedback,
        COALESCE(answers.missed_keywords, '[]'::json) AS missed_keywords,
        COALESCE(answers.communication_score, 0)::int AS communication_score,
        COALESCE(answers.technical_score, 0)::int AS technical_score,
        COALESCE(answers.confidence_score, 0)::int AS confidence_score,
        COALESCE(answers.strengths, '[]'::json) AS strengths,
        COALESCE(answers.weaknesses, '[]'::json) AS weaknesses,
        COALESCE(answers.improved_answer, '') AS improved_answer
      FROM answers
      JOIN questions
        ON questions.id = answers.question_id
      WHERE answers.session_id = $1
      ORDER BY answers.question_order
    `,
    [sessionId]
  );

  return {
    success: true,
    session: sessionResult.rows[0],
    answers: answersResult.rows,
  };
}