import {
  loadInterviewOptions,
  createInterviewSession,
  loadSessionQuestions,
  saveAnswer,
  deleteInterviewSession,
  loadFeedback,
  
} from "../services/interviewService.js";

export async function getInterviewOptions(req, res) {
  try {
    const result = await loadInterviewOptions();

    res.json(result);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Interview options could not be loaded",
    });
  }
}

export async function startInterview(req, res) {
  try {
    const userId = req.body.user_id;
    const categoryId = req.body.category_id;
    const difficultyId = req.body.difficulty_id;
    const questionCount = req.body.question_count;
    const answerModeId = req.body.answer_mode_id;

    const result = await createInterviewSession(
      userId,
      categoryId,
      difficultyId,
      questionCount,
      answerModeId
    );

    res.json(result);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Interview session could not be created",
    });
  }
}

export async function getSessionQuestions(req, res) {
  try {
    const sessionId = req.params.sessionId;

    const result = await loadSessionQuestions(sessionId);

    res.json(result);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Questions could not be loaded",
    });
  }
}
export async function createAnswer(req, res) {
  try {
    const sessionId = req.body.session_id;
    const questionId = req.body.question_id;
    const questionOrder = req.body.question_order;
    const userAnswer = req.body.user_answer;
    const completeInterview = req.body.complete_interview;

    if (!userAnswer.trim()) {
      return res.status(400).json({
        success: false,
        message: "Please enter an answer",
      });
    }

    const result = await saveAnswer(
      sessionId,
      questionId,
      questionOrder,
      userAnswer,
      completeInterview
    );

    res.json(result);
  } catch (error) {
    console.error("Save answer error:", error);

    res.status(500).json({
      success: false,
      message: "Answer could not be saved",
    });
  }
}
export async function cancelInterview(req, res) {
  try {
    const sessionId = req.params.sessionId;

    const result = await deleteInterviewSession(sessionId);

    res.json(result);
  } catch (error) {
    console.error("Cancel interview error:", error);

    res.status(500).json({
      success: false,
      message: "Interview could not be deleted",
    });
  }
}
export async function getFeedback(req, res) {
  try {
    const sessionId = req.params.sessionId;

    const result = await loadFeedback(sessionId);

    res.json(result);
  } catch (error) {
    console.error("Load feedback error:", error);

    res.status(500).json({
      success: false,
      message: "Feedback could not be loaded",
    });
  }
}


 
