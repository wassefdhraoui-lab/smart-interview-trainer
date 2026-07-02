import { getUserProgressData } from "../services/progressService.js";

export async function getUserProgress(req, res) {
  try {
    const userId = req.query.userId;

    const result = await getUserProgressData(userId);

    res.json(result);
  } catch (error) {
    console.error("Progress error:", error);

    res.status(500).json({
      success: false,
      message: "Progress could not be loaded",
    });
  }
}