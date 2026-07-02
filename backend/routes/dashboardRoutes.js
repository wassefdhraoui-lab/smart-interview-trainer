import express from "express";
import { GetdashboardData } from "../controllers/dashboardController.js";
import { getInterviewOptions } from "../controllers/interviewController.js";

const router = express.Router();


// GET /dashboard
router.get("/", getInterviewOptions);

export default router;