// auth.js (ES module version)
import express from 'express';
import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';

const router = express.Router();

// Simple in-memory user store (replace with persistent store if needed)
const users = [];

// Register
router.post('/register', async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) 
      return res.status(400).json({ message: 'username and password required' });

    if (users.some(u => u.username === username)) {
      return res.status(400).json({ message: 'username already exists' });
    }

    const hash = await bcrypt.hash(password, 10);
    const user = { id: uuidv4(), username, passwordHash: hash };
    users.push(user);

    res.json({ userId: user.id, message: 'registered' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'server error' });
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = users.find(u => u.username === username);
    if (!user) return res.status(400).json({ message: 'user not found' });

    const ok = await bcrypt.compare(password, user.passwordHash);
    if (!ok) return res.status(400).json({ message: 'invalid password' });

    res.json({ userId: user.id, message: 'logged in' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'server error' });
  }
});

export default router;
