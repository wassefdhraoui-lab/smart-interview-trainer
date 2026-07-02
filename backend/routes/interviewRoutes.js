import express from "express";
import { getInterviewOptions, startInterview, getSessionQuestions, createAnswer, cancelInterview, getFeedback,} from "../controllers/interviewController.js";

const router = express.Router();

// POST /sessions

router.get("/options", getInterviewOptions);

router.post("/sessions", startInterview);

router.get(
  "/sessions/:sessionId/questions",
  getSessionQuestions
);

router.post("/answers", createAnswer);

router.delete(
  "/sessions/:sessionId",
  cancelInterview
);

router.get(
  "/sessions/:sessionId/feedback",
  getFeedback
);
export default router;