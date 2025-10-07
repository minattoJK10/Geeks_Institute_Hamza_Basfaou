// games.js (ES module version)
import express from 'express';
import { v4 as uuidv4 } from 'uuid';

const router = express.Router();

const GRID = 10; // 10x10
const games = {}; // in-memory games store

function genObstacles(count = 14) {
  const obs = new Set();
  while (obs.size < count) {
    const x = Math.floor(Math.random() * GRID);
    const y = Math.floor(Math.random() * GRID);
    // avoid corners (bases)
    if ((x === 0 && y === 0) || (x === GRID - 1 && y === GRID - 1)) continue;
    obs.add(`${x},${y}`);
  }
  return Array.from(obs).map(s => {
    const [x, y] = s.split(',').map(Number);
    return { x, y };
  });
}

function inBounds(x, y) { return x >= 0 && y >= 0 && x < GRID && y < GRID; }
function samePos(a, b) { return a.x === b.x && a.y === b.y; }
function isObstacle(game, x, y) { return game.obstacles.some(o => o.x === x && o.y === y); }
function adjacent(a, b) {
  const dx = Math.abs(a.x - b.x);
  const dy = Math.abs(a.y - b.y);
  return (dx + dy) === 1;
}

// Create game
router.post('/', (req, res) => {
  const { userId } = req.body;
  if (!userId) return res.status(400).json({ message: 'userId required' });

  const gameId = uuidv4();
  const game = {
    id: gameId,
    gridSize: GRID,
    obstacles: genObstacles(14),
    players: {
      p1: { id: userId, pos: { x: 0, y: 0 }, base: { x: 0, y: 0 } },
      p2: null
    },
    turn: 'p1',
    status: 'waiting',
    winner: null,
    history: []
  };
  games[gameId] = game;
  res.json({ gameId, message: 'game created', game });
});

// Join
router.post('/:gameId/join', (req, res) => {
  const { userId } = req.body;
  const game = games[req.params.gameId];
  if (!game) return res.status(404).json({ message: 'game not found' });
  if (game.players.p2) return res.status(400).json({ message: 'game already has two players' });
  if (game.players.p1.id === userId) return res.status(400).json({ message: 'cannot join your own game as p2' });

  game.players.p2 = { id: userId, pos: { x: GRID - 1, y: GRID - 1 }, base: { x: GRID - 1, y: GRID - 1 } };
  game.status = 'playing';
  res.json({ message: 'joined game', game });
});

// Get state
router.get('/:gameId', (req, res) => {
  const game = games[req.params.gameId];
  if (!game) return res.status(404).json({ message: 'game not found' });
  res.json(game);
});

// Move
router.post('/:gameId/move', (req, res) => {
  const { userId, direction } = req.body;
  const game = games[req.params.gameId];
  if (!game) return res.status(404).json({ message: 'game not found' });
  if (game.status !== 'playing') return res.status(400).json({ message: 'game not in playing state' });

  const playerKey = (game.players.p1 && game.players.p1.id === userId) ? 'p1'
                 : (game.players.p2 && game.players.p2.id === userId) ? 'p2' : null;
  if (!playerKey) return res.status(403).json({ message: 'not a player in this game' });
  if (game.turn !== playerKey) return res.status(400).json({ message: "not your turn" });

  const delta = { up: {x:0,y:-1}, down:{x:0,y:1}, left:{x:-1,y:0}, right:{x:1,y:0} }[direction];
  if (!delta) return res.status(400).json({ message: 'invalid direction' });

  const cur = game.players[playerKey].pos;
  const nx = cur.x + delta.x;
  const ny = cur.y + delta.y;

  if (!inBounds(nx, ny)) return res.status(400).json({ message: 'out of bounds' });
  if (isObstacle(game, nx, ny)) return res.status(400).json({ message: 'blocked by obstacle' });

  const otherKey = playerKey === 'p1' ? 'p2' : 'p1';
  if (game.players[otherKey] && samePos({ x: nx, y: ny }, game.players[otherKey].pos)) {
    return res.status(400).json({ message: 'cell occupied by opponent' });
  }

  game.players[playerKey].pos = { x: nx, y: ny };
  game.history.push({ turnBy: playerKey, action: 'move', pos: { x: nx, y: ny }, time: Date.now() });

  const opponentBase = game.players[otherKey] ? game.players[otherKey].base : null;
  if (opponentBase && samePos(game.players[playerKey].pos, opponentBase)) {
    game.status = 'finished';
    game.winner = playerKey;
    return res.json({ message: `${playerKey} wins by capturing base!`, game });
  }

  game.turn = otherKey;
  res.json({ message: 'move accepted', game });
});

// Attack
router.post('/:gameId/attack', (req, res) => {
  const { userId } = req.body;
  const game = games[req.params.gameId];
  if (!game) return res.status(404).json({ message: 'game not found' });
  if (game.status !== 'playing') return res.status(400).json({ message: 'game not in playing state' });

  const playerKey = (game.players.p1 && game.players.p1.id === userId) ? 'p1'
                 : (game.players.p2 && game.players.p2.id === userId) ? 'p2' : null;
  if (!playerKey) return res.status(403).json({ message: 'not a player in this game' });
  if (game.turn !== playerKey) return res.status(400).json({ message: "not your turn" });

  const otherKey = playerKey === 'p1' ? 'p2' : 'p1';
  if (!game.players[otherKey]) return res.status(400).json({ message: 'opponent not present' });

  const playerPos = game.players[playerKey].pos;
  const opponentBase = game.players[otherKey].base;
  if (!adjacent(playerPos, opponentBase)) return res.status(400).json({ message: 'not adjacent to opponent base' });

  game.status = 'finished';
  game.winner = playerKey;
  game.history.push({ turnBy: playerKey, action: 'attack', time: Date.now() });
  res.json({ message: `${playerKey} wins by attack!`, game });
});

export default router;
