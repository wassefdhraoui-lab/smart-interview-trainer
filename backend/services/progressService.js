import pool from "../database/db.js";

export async function getUserProgressData(userId) {
  const summaryResult = await pool.query(
    `
      SELECT
        COUNT(*)::int AS completed_interviews,
        COALESCE(ROUND(AVG(total_score)), 0)::int AS average_score,
        COALESCE(MAX(total_score), 0)::int AS best_score
      FROM interview_sessions
      WHERE user_id = $1
      AND status = 'completed'
      AND total_score IS NOT NULL
    `,
    [userId]
  );

  const categoryResult = await pool.query(
    `
      SELECT
        categories.name AS category,
        COALESCE(ROUND(AVG(interview_sessions.total_score)), 0)::int AS average_score,
        COUNT(interview_sessions.id)::int AS completed_count
      FROM categories
      LEFT JOIN interview_sessions
        ON interview_sessions.category_id = categories.id
        AND interview_sessions.user_id = $1
        AND interview_sessions.status = 'completed'
        AND interview_sessions.total_score IS NOT NULL
      GROUP BY categories.name
      ORDER BY average_score DESC
    `,
    [userId]
  );

  const historyResult = await pool.query(
    `
      SELECT
        id,
        total_score::int AS total_score,
        completed_at
      FROM interview_sessions
      WHERE user_id = $1
      AND status = 'completed'
      AND total_score IS NOT NULL
      ORDER BY id ASC
    `,
    [userId]
  );

  const recentResult = await pool.query(
    `
      SELECT
        interview_sessions.id,
        interview_sessions.total_score::int AS total_score,
        interview_sessions.completed_at,
        categories.name AS category,
        difficulties.name AS difficulty
      FROM interview_sessions
      JOIN categories
        ON categories.id = interview_sessions.category_id
      JOIN difficulties
        ON difficulties.id = interview_sessions.difficulty_id
      WHERE interview_sessions.user_id = $1
      AND interview_sessions.status = 'completed'
      AND interview_sessions.total_score IS NOT NULL
      ORDER BY interview_sessions.id DESC
      LIMIT 8
    `,
    [userId]
  );

  const skillResult = await pool.query(
  `
    SELECT
      COALESCE(ROUND(AVG(answers.communication_score)), 0)::int AS communication_score,
      COALESCE(ROUND(AVG(answers.technical_score)), 0)::int AS technical_score,
      COALESCE(ROUND(AVG(answers.confidence_score)), 0)::int AS confidence_score
    FROM answers
    JOIN interview_sessions
      ON interview_sessions.id = answers.session_id
    WHERE interview_sessions.user_id = $1
  `,
  [userId]
);

return {
  success: true,
  summary: summaryResult.rows[0],
  categoryStats: categoryResult.rows,
  scoreHistory: historyResult.rows,
  recentSessions: recentResult.rows,
  skillStats: skillResult.rows[0],
};
}