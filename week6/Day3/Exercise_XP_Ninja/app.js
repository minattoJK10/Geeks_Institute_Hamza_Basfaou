import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

import questionRoutes from "./server/routes/questionRoutes.js";
import scoreRoutes from "./server/routes/scoreRoutes.js";

dotenv.config();
const app = express();

// For __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors());
app.use(express.json());

// Serve frontend static files from 'public' folder
app.use(express.static(path.join(__dirname, "public")));

// API Routes
app.use("/api/questions", questionRoutes);
app.use("/api/scores", scoreRoutes);

// Handle invalid API routes
app.use((req, res) => res.status(404).json({ error: "Route not found" }));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`🚀 Server running on http://localhost:${PORT}`)
);
