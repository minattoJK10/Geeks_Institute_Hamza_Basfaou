let token = "";
let questions = [];
let currentQuestion = 0;
let score = 0;
let timer;
const timePerQuestion = 15;

const loginContainer = document.querySelector(".login-container");
const quizContainer = document.querySelector(".quiz-container");
const questionContainer = document.getElementById("question-container");
const answersContainer = document.getElementById("answers-container");
const nextBtn = document.getElementById("next-btn");
const scoreContainer = document.getElementById("score-container");
const timerContainer = document.getElementById("timer");

document.getElementById("register-btn").addEventListener("click", async () => {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  const res = await fetch("/api/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });
  const data = await res.json();
  alert(data.message);
});

document.getElementById("login-btn").addEventListener("click", async () => {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  const res = await fetch("/api/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });
  const data = await res.json();
  if (data.token) {
    token = data.token;
    loginContainer.style.display = "none";
    quizContainer.style.display = "block";
    loadQuestions();
  } else {
    alert(data.message);
  }
});

async function loadQuestions() {
  const res = await fetch("/api/questions", {
    headers: { Authorization: `Bearer ${token}` },
  });
  const data = await res.json();
  questions = data.questions;
  currentQuestion = 0;
  score = 0;
  showQuestion();
}

function startTimer() {
  let timeLeft = timePerQuestion;
  timerContainer.textContent = `Time: ${timeLeft}s`;
  timer = setInterval(() => {
    timeLeft--;
    timerContainer.textContent = `Time: ${timeLeft}s`;
    if (timeLeft <= 0) {
      clearInterval(timer);
      alert("Time's up!");
      nextQuestion();
    }
  }, 1000);
}

function showQuestion() {
  const q = questions[currentQuestion];
  questionContainer.textContent = `${q.question} (Difficulty: ${q.difficulty})`;
  answersContainer.innerHTML = "";
  q.answers.forEach((answer) => {
    const btn = document.createElement("button");
    btn.textContent = answer;
    btn.addEventListener("click", () => selectAnswer(answer));
    answersContainer.appendChild(btn);
  });
  nextBtn.style.display = "none";
  clearInterval(timer);
  startTimer();
}

function selectAnswer(answer) {
  const q = questions[currentQuestion];
  clearInterval(timer);
  if (answer === q.correct) score++;
  nextBtn.style.display = "inline-block";
}

nextBtn.addEventListener("click", () => nextQuestion());

function nextQuestion() {
  currentQuestion++;
  if (currentQuestion < questions.length) showQuestion();
  else showScore();
}

function showScore() {
  questionContainer.textContent = "Quiz Finished!";
  answersContainer.innerHTML = "";
  nextBtn.style.display = "none";
  timerContainer.textContent = "";
  scoreContainer.textContent = `Your score: ${score} / ${questions.length}`;

  fetch("/api/leaderboard", {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
    body: JSON.stringify({ score }),
  }).then(() => loadLeaderboard());
}

async function loadLeaderboard() {
  const res = await fetch("/api/leaderboard");
  const data = await res.json();
  const lbDiv = document.createElement("div");
  lbDiv.innerHTML = "<h2>Leaderboard</h2>";
  data.leaderboard.forEach((entry, i) => {
    lbDiv.innerHTML += `<p>${i + 1}. ${entry.username} - ${entry.score}</p>`;
  });
  quizContainer.appendChild(lbDiv);
}
