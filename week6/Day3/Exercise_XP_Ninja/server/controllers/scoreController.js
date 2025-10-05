import * as Score from "../models/scoreModel.js";

// Add a new score
export const createScore = async (req, res) => {
  try {
    const { username, score } = req.body;
    if (!username || score == null) return res.status(400).json({ error: "Missing username or score" });

    const newScore = await Score.addScore(username, score);
    res.status(201).json(newScore);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get leaderboard
export const getLeaderboard = async (req, res) => {
  try {
    const scores = await Score.getScores();
    res.json(scores);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
