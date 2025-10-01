// app.js
const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const PORT = 5000;
const SECRET_KEY = "emojiSecret";

app.use(bodyParser.json());
app.use(cors());
app.use(express.static("public")); // serve frontend

// ---------------- In-memory DB ----------------
let users = []; // { username, passwordHash }
let leaderboard = []; // { username, score }

const emojis = [
  { emoji: '😀', name: 'Smile', difficulty: 'Easy', hint: 'It’s a happy face' },
  { emoji: '🐶', name: 'Dog', difficulty: 'Easy', hint: 'Man’s best friend' },
  { emoji: '🌮', name: 'Taco', difficulty: 'Medium', hint: 'A Mexican food' },
  { emoji: '🚀', name: 'Rocket', difficulty: 'Medium', hint: 'Goes to space' },
  { emoji: '🦄', name: 'Unicorn', difficulty: 'Hard', hint: 'Magical horse' },
  { emoji: '🧩', name: 'Puzzle', difficulty: 'Hard', hint: 'Pieces that fit together' },
  // Add more emojis as needed
];


// ---------------- Auth Middleware ----------------
function authMiddleware(req, res, next) {
    const token = req.headers["authorization"]?.split(" ")[1];
    if (!token) return res.status(401).json({ message: "Token required" });

    jwt.verify(token, SECRET_KEY, (err, user) => {
        if (err) return res.status(403).json({ message: "Invalid token" });
        req.user = user;
        next();
    });
}

// ---------------- Routes ----------------

// Register
app.post("/api/register", async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) return res.status(400).json({ message: "Username & password required" });

    if (users.find(u => u.username === username))
        return res.status(400).json({ message: "User exists" });

    const passwordHash = await bcrypt.hash(password, 10);
    users.push({ username, passwordHash });
    res.json({ message: "User registered successfully" });
});

// Login
app.post("/api/login", async (req, res) => {
    const { username, password } = req.body;
    const user = users.find(u => u.username === username);
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const match = await bcrypt.compare(password, user.passwordHash);
    if (!match) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ username }, SECRET_KEY, { expiresIn: "2h" });
    res.json({ message: "Login successful", token });
});

// Get random emoji with options
app.get("/api/emoji", authMiddleware, (req, res) => {
    const randomIndex = Math.floor(Math.random() * emojis.length);
    const correctEmoji = emojis[randomIndex];

    // Generate 3 wrong options
    let options = [correctEmoji.name];
    while (options.length < 4) {
        const rand = emojis[Math.floor(Math.random() * emojis.length)].name;
        if (!options.includes(rand)) options.push(rand);
    }

    // Shuffle options
    options = options.sort(() => Math.random() - 0.5);

    res.json({ emoji: correctEmoji.emoji, options, correct: correctEmoji.name });
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

// ---------------- Start server ----------------
app.listen(PORT, () => {
    console.log(`🚀 Emoji game running on http://localhost:${PORT}`);
});
