import express from "express";
import todoRoutes from "./server/routes/todoRoutes.js";
import cors from "cors";
import dotenv from "dotenv";

const app = express();
dotenv.config();
// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/todos", todoRoutes);

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
