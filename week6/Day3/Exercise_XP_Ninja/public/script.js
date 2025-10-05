let currentQuestion = 1;
let score = 0;
const username = prompt("Enter your username") || "Guest";

const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const nextBtn = document.getElementById("next-btn");

// Load a question by ID
async function loadQuestion(id) {
  try {
    const res = await fetch(`http://localhost:5000/api/questions/${id}`);
    const data = await res.json();

    // If quiz finished
    if (!data.id) {
      showResult();
      await saveScore();
      await showLeaderboard();
      return;
    }

    // Display question
    questionEl.textContent = data.question;
    optionsEl.innerHTML = "";

    // Display options
    data.options.forEach(option => {
      const li = document.createElement("li");
      li.textContent = option.text;
      li.onclick = () => handleAnswer(option.id, data.correct_answer);
      optionsEl.appendChild(li);
    });
  } catch (err) {
    console.error("Failed to load question:", err);
    questionEl.textContent = "Failed to load question. Please try again.";
  }
}

// Handle answer selection
function handleAnswer(selectedId, correctId) {
  const isCorrect = selectedId === correctId;
  if (isCorrect) score++;
  
  // Optional: highlight correct/wrong
  alert(isCorrect ? "Correct!" : "Wrong!");

  currentQuestion++;
  loadQuestion(currentQuestion);
}

// Save score to backend
async function saveScore() {
  try {
    await fetch("http://localhost:5000/api/scores", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, score }),
    });
  } catch (err) {
    console.error("Failed to save score:", err);
  }
}

// Show final score
function showResult() {
  questionEl.textContent = `Quiz finished! Your score: ${score}`;
  optionsEl.innerHTML = "";
  nextBtn.style.display = "none";
}

// Show leaderboard
async function showLeaderboard() {
  try {
    const res = await fetch("http://localhost:5000/api/scores");
    const scores = await res.json();

    const leaderboard = document.createElement("div");
    leaderboard.innerHTML = "<h2>Leaderboard</h2>";
    const ul = document.createElement("ul");
    scores.forEach(s => {
      const li = document.createElement("li");
      li.textContent = `${s.username}: ${s.score}`;
      ul.appendChild(li);
    });
    leaderboard.appendChild(ul);
    document.body.appendChild(leaderboard);
  } catch (err) {
    console.error("Failed to load leaderboard:", err);
  }
}

// Start quiz
loadQuestion(currentQuestion);
