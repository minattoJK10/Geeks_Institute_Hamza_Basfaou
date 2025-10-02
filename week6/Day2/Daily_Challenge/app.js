// app.js
const express = require("express");
const app = express();
const quizRouter = require("./routes/quiz");

// Middleware
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/quiz", quizRouter);

// Server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`🎯 Trivia Quiz running at http://localhost:${PORT}/quiz`);
});
