import express from "express";
import "dotenv/config";
console.log("TOKEN EXISTS:", !!process.env.GITHUB_TOKEN);
console.log("TOKEN START:", process.env.GITHUB_TOKEN?.slice(0, 10));

import authRoutes from "./routes/authRoutes.js";
import cors from "cors";
import dashboardRoutes from "./routes/dashboardRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import interviewRoutes from "./routes/interviewRoutes.js";
import progressRoutes from "./routes/progressRoutes.js";

const app = express();
const port = 5000;
app.use(cors({
  origin: "http://localhost:3000",
}));

// Middleware: converts frontend JSON into req.body
app.use(express.json());

// Allow frontend localhost:3000 to talk to backend localhost:5000
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  next();
});
// All auth routes start here
app.use("/auth", authRoutes);
app.use("/dashboard", dashboardRoutes);
app.use("/users", userRoutes);
app.use("/interview", interviewRoutes);
app.use("/progress", progressRoutes);

app.get("/", (req, res) => {
  res.send("Backend is running");
});

app.listen(port, () => {
  console.log(`Backend running on http://localhost:${port}`);
});