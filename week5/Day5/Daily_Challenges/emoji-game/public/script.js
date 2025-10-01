let token = "";
let currentEmoji;
let score = 0;
let timer;
const timeLimit = 15;

const loginContainer = document.querySelector(".login-container");
const gameContainer = document.querySelector(".game-container");
const emojiDisplay = document.getElementById("emoji-display");
const optionsContainer = document.getElementById("options-container");
const timerDisplay = document.getElementById("timer");
const scoreDisplay = document.getElementById("score-display");
const nextBtn = document.getElementById("next-btn");
const leaderboardDiv = document.getElementById("leaderboard");

// ---------------- Auth ----------------
document.getElementById("register-btn").addEventListener("click", async () => {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const res = await fetch("/api/register", {
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({username,password})
    });
    const data = await res.json();
    alert(data.message);
});

document.getElementById("login-btn").addEventListener("click", async () => {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const res = await fetch("/api/login", {
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({username,password})
    });
    const data = await res.json();
    if(data.token){
        token = data.token;
        loginContainer.style.display = "none";
        gameContainer.style.display = "block";
        loadEmoji();
    } else alert(data.message);
});

// ---------------- Load Emoji ----------------
async function loadEmoji(){
    const res = await fetch("/api/emoji", {headers:{"Authorization":`Bearer ${token}`}});
    const data = await res.json();
    currentEmoji = data;
    emojiDisplay.textContent = data.emoji;
    optionsContainer.innerHTML = "";
    data.options.forEach(opt => {
        const btn = document.createElement("button");
        btn.textContent = opt;
        btn.addEventListener("click",()=>selectOption(opt));
        optionsContainer.appendChild(btn);
    });
    nextBtn.style.display = "none";
    startTimer();
}

function startTimer(){
    let timeLeft = timeLimit;
    timerDisplay.textContent = `Time: ${timeLeft}s`;
    clearInterval(timer);
    timer = setInterval(()=>{
        timeLeft--;
        timerDisplay.textContent = `Time: ${timeLeft}s`;
        if(timeLeft<=0){
            clearInterval(timer);
            alert(`Time's up! Correct: ${currentEmoji.correct}`);
            nextBtn.style.display = "inline-block";
        }
    },1000);
}

function selectOption(option){
    clearInterval(timer);
    if(option===currentEmoji.correct){
        alert("Correct!");
        score++;
    } else alert(`Wrong! Correct: ${currentEmoji.correct}`);
    scoreDisplay.textContent = `Score: ${score}`;
    nextBtn.style.display = "inline-block";
}

nextBtn.addEventListener("click", ()=>{
    nextBtn.style.display="none";
    loadEmoji();
});

// ---------------- Save Score & Leaderboard ----------------
window.addEventListener("beforeunload", async ()=>{
    await fetch("/api/leaderboard", {
        method:"POST",
        headers:{
            "Content-Type":"application/json",
            "Authorization":`Bearer ${token}`
        },
        body:JSON.stringify({score})
    });
});

async function loadLeaderboard(){
    const res = await fetch("/api/leaderboard");
    const data = await res.json();
    leaderboardDiv.innerHTML="<h2>Leaderboard</h2>";
    data.leaderboard.forEach((entry,i)=>{
        leaderboardDiv.innerHTML += `<p>${i+1}. ${entry.username} - ${entry.score}</p>`;
    });
}
setInterval(loadLeaderboard,5000);
