import express from "express";
import { createScore, getLeaderboard } from "../controllers/scoreController.js";

const router = express.Router();

router.post("/", createScore);       // Add user score
router.get("/", getLeaderboard);     // Get leaderboard

export default router;
