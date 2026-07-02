import { loadDashboardData } from "../services/dashboardService.js";

export async function GetdashboardData(req, res) {
  const userId = req.query.userId; // Assuming the user ID is available in the request object
  const result = await loadDashboardData(userId);

  res.json(result);
}