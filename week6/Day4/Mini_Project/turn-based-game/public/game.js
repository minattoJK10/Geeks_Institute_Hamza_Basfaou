// public/game.js

// DOM elements
const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');
const registerBtn = document.getElementById('registerBtn');
const loginBtn = document.getElementById('loginBtn');
const authMsg = document.getElementById('authMsg');

const controls = document.getElementById('controls');
const meSpan = document.getElementById('me');
const createGameBtn = document.getElementById('createGame');
const joinGameBtn = document.getElementById('joinGame');
const gameIdInput = document.getElementById('gameIdInput');
const gameMsg = document.getElementById('gameMsg');

const boardContainer = document.getElementById('board');
const actionButtons = document.querySelectorAll('#actions button[data-dir]');
const attackBtn = document.getElementById('attackBtn');

// State
let userId = null;
let username = null;
let gameId = null;
let currentGame = null;

// -------- AUTH --------
registerBtn.addEventListener('click', async () => {
  const res = await fetch('/api/auth/register', {
    method: 'POST',
    headers: {'Content-Type':'application/json'},
    body: JSON.stringify({ username: usernameInput.value, password: passwordInput.value })
  });
  const data = await res.json();
  authMsg.textContent = data.message;
});

loginBtn.addEventListener('click', async () => {
  const res = await fetch('/api/auth/login', {
    method: 'POST',
    headers: {'Content-Type':'application/json'},
    body: JSON.stringify({ username: usernameInput.value, password: passwordInput.value })
  });
  const data = await res.json();
  if (data.userId) {
    userId = data.userId;
    username = usernameInput.value;
    authMsg.textContent = 'Logged in!';
    controls.style.display = 'block';
    meSpan.textContent = username;
  } else {
    authMsg.textContent = data.message;
  }
});

// -------- CREATE / JOIN GAME --------
createGameBtn.addEventListener('click', async () => {
  const res = await fetch('/api/games', {
    method: 'POST',
    headers: {'Content-Type':'application/json'},
    body: JSON.stringify({ userId })
  });
  const data = await res.json();
  gameId = data.gameId;
  currentGame = data.game;
  gameMsg.textContent = 'Game created. Waiting for player 2...';
  renderGame(currentGame);
});

joinGameBtn.addEventListener('click', async () => {
  const joinId = gameIdInput.value;
  const res = await fetch(`/api/games/${joinId}/join`, {
    method: 'POST',
    headers: {'Content-Type':'application/json'},
    body: JSON.stringify({ userId })
  });
  const data = await res.json();
  if (data.game) {
    gameId = joinId;
    currentGame = data.game;
    gameMsg.textContent = 'Joined game!';
    renderGame(currentGame);
  } else {
    gameMsg.textContent = data.message;
  }
});

// -------- RENDER BOARD --------
function renderGame(game) {
  currentGame = game;
  const size = game.gridSize;
  boardContainer.innerHTML = '';
  for (let y = 0; y < size; y++) {
    const row = document.createElement('div');
    row.className = 'row';
    for (let x = 0; x < size; x++) {
      const cell = document.createElement('div');
      cell.className = 'cell';

      // Obstacles
      if (game.obstacles.some(o => o.x===x && o.y===y)) cell.classList.add('obstacle');

      // Players
      if (game.players.p1.pos.x===x && game.players.p1.pos.y===y) cell.classList.add('p1');
      if (game.players.p2 && game.players.p2.pos.x===x && game.players.p2.pos.y===y) cell.classList.add('p2');

      // Bases
      if (game.players.p1.base.x===x && game.players.p1.base.y===y) cell.classList.add('base1');
      if (game.players.p2 && game.players.p2.base.x===x && game.players.p2.base.y===y) cell.classList.add('base2');

      row.appendChild(cell);
    }
    boardContainer.appendChild(row);
  }

  // Update game message
  if (game.status === 'finished') {
    gameMsg.textContent = `${game.winner.toUpperCase()} wins!`;
    actionButtons.forEach(b => b.disabled = true);
    attackBtn.disabled = true;
  } else {
    const turnPlayer = game.turn === 'p1' ? game.players.p1.id : game.players.p2?.id;
    gameMsg.textContent = turnPlayer === userId ? "Your turn!" : "Opponent's turn...";
  }
}

// -------- MOVE --------
actionButtons.forEach(btn => {
  btn.addEventListener('click', async () => {
    if (!gameId) return;
    const direction = btn.dataset.dir;
    const res = await fetch(`/api/games/${gameId}/move`, {
      method: 'POST',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify({ userId, direction })
    });
    const data = await res.json();
    if (data.game) renderGame(data.game);
    else gameMsg.textContent = data.message;
  });
});

// -------- ATTACK --------
attackBtn.addEventListener('click', async () => {
  if (!gameId) return;
  const res = await fetch(`/api/games/${gameId}/attack`, {
    method: 'POST',
    headers: {'Content-Type':'application/json'},
    body: JSON.stringify({ userId })
  });
  const data = await res.json();
  if (data.game) renderGame(data.game);
  else gameMsg.textContent = data.message;
});
