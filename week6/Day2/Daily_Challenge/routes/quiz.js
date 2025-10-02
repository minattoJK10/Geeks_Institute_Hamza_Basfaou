// routes/quiz.js
const express = require("express");
const router = express.Router();

// Hardcoded trivia questions
const triviaQuestions = [
  { question: "What is the capital of France?", answer: "Paris" },
  { question: "Which planet is known as the Red Planet?", answer: "Mars" },
  { question: "What is the largest mammal in the world?", answer: "Blue whale" }
];

// In-memory state
let currentQuestionIndex = 0;
let score = 0;

// GET /quiz → Show first question (or current question)
router.get("/", (req, res) => {
  if (currentQuestionIndex >= triviaQuestions.length) {
    return res.redirect("/quiz/score");
  }

  const currentQ = triviaQuestions[currentQuestionIndex];
  const form = `
    <html>
      <head>
        <title>Trivia Quiz</title>
        <style>
          body { font-family: Arial, sans-serif; text-align: center; margin-top: 50px; }
          h1 { color: #333; }
          input, button { padding: 10px; margin: 10px; font-size: 16px; }
        </style>
      </head>
      <body>
        <h1>Trivia Quiz</h1>
        <p><b>Question ${currentQuestionIndex + 1}:</b> ${currentQ.question}</p>
        <form method="POST" action="/quiz">
          <input type="text" name="answer" placeholder="Your answer" required />
          <button type="submit">Submit</button>
        </form>
      </body>
    </html>
  `;
  res.send(form);
});

// POST /quiz → Submit answer, check correctness, move to next
router.post("/", (req, res) => {
  const userAnswer = req.body.answer?.trim();
  const currentQ = triviaQuestions[currentQuestionIndex];

  let feedback;
  if (userAnswer.toLowerCase() === currentQ.answer.toLowerCase()) {
    score++;
    feedback = `<p style="color:green;">✅ Correct!</p>`;
  } else {
    feedback = `<p style="color:red;">❌ Wrong! Correct answer: ${currentQ.answer}</p>`;
  }

  currentQuestionIndex++;

  if (currentQuestionIndex >= triviaQuestions.length) {
    return res.redirect("/quiz/score");
  }

  const nextQ = triviaQuestions[currentQuestionIndex];
  const page = `
    <html>
      <head>
        <title>Trivia Quiz</title>
      </head>
      <body>
        ${feedback}
        <p><b>Next Question:</b> ${nextQ.question}</p>
        <form method="POST" action="/quiz">
          <input type="text" name="answer" placeholder="Your answer" required />
          <button type="submit">Submit</button>
        </form>
      </body>
    </html>
  `;
  res.send(page);
});

// GET /quiz/score → Show final score
router.get("/score", (req, res) => {
  const page = `
    <html>
      <head>
        <title>Final Score</title>
      </head>
      <body style="text-align:center; font-family:Arial; margin-top:50px;">
        <h1>🎉 Quiz Finished!</h1>
        <p>Your final score: <b>${score}/${triviaQuestions.length}</b></p>
        <a href="/quiz/reset">Play Again</a>
      </body>
    </html>
  `;
  res.send(page);
});

// Extra: Reset route
router.get("/reset", (req, res) => {
  currentQuestionIndex = 0;
  score = 0;
  res.redirect("/quiz");
});

module.exports = router;
