// app.js
const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const PORT = 5000;
const SECRET_KEY = "quizsecret";

// Middleware
app.use(bodyParser.json());
app.use(cors());
app.use(express.static("public")); // serve frontend

// ------------------- In-memory DB -------------------
let users = []; // { username, passwordHash }
let leaderboard = []; // { username, score }
const questions = [
  {
    question: "What is the capital of France?",
    answers: ["Berlin", "Madrid", "Paris", "Rome"],
    correct: "Paris",
    difficulty: "Easy",
  },
  {
    question: "What is 12 * 12?",
    answers: ["144", "121", "112", "124"],
    correct: "144",
    difficulty: "Medium",
  },
  {
    question: "Which language is used for Node.js?",
    answers: ["Python", "JavaScript", "Java", "C#"],
    correct: "JavaScript",
    difficulty: "Easy",
  },
];

// ------------------- Auth Middleware -------------------
function authMiddleware(req, res, next) {
  const token = req.headers["authorization"]?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Token required" });

  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) return res.status(403).json({ message: "Invalid token" });
    req.user = user;
    next();
  });
}

// ------------------- Routes -------------------

// Register
app.post("/api/register", async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password)
    return res.status(400).json({ message: "Username and password required" });

  if (users.find((u) => u.username === username))
    return res.status(400).json({ message: "User exists" });

  const passwordHash = await bcrypt.hash(password, 10);
  users.push({ username, passwordHash });
  res.json({ message: "User registered successfully" });
});

// Login
app.post("/api/login", async (req, res) => {
  const { username, password } = req.body;
  const user = users.find((u) => u.username === username);
  if (!user) return res.status(400).json({ message: "Invalid credentials" });

  const match = await bcrypt.compare(password, user.passwordHash);
  if (!match) return res.status(400).json({ message: "Invalid credentials" });

  const token = jwt.sign({ username }, SECRET_KEY, { expiresIn: "2h" });
  res.json({ message: "Login successful", token });
});

// Get questions (protected)
app.get("/api/questions", authMiddleware, (req, res) => {
  res.json({ questions });
});

// Save score
app.post("/api/leaderboard", authMiddleware, (req, res) => {
  const { score } = req.body;
  const { username } = req.user;
  leaderboard.push({ username, score });
  leaderboard.sort((a, b) => b.score - a.score);
  res.json({ message: "Score saved", leaderboard });
});

// Get leaderboard
app.get("/api/leaderboard", (req, res) => {
  res.json({ leaderboard });
});

// ------------------- Start Server -------------------
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
