const bcrypt = require("bcrypt");
const db = require("../config/db");
const User = require("../models/userModel");

const register = async (req, res) => {
  try {
    const { email, username, first_name, last_name, password } = req.body;
    if (!email || !username || !password) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const userData = { email, username, first_name, last_name };
    const hashData = { username, password: hashedPassword };

    const user = await db.transaction(async (trx) => {
      return await User.createUser(trx, userData, hashData);
    });

    res.status(201).json({ message: "User registered", user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const hashEntry = await User.getUserByUsername(username);

    if (!hashEntry) return res.status(404).json({ error: "User not found" });

    const validPassword = await bcrypt.compare(password, hashEntry.password);
    if (!validPassword) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    res.json({ message: "Login successful", username });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await User.getUsers();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getUser = async (req, res) => {
  try {
    const user = await User.getUserById(req.params.id);
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const updateUser = async (req, res) => {
  try {
    const updated = await User.updateUser(req.params.id, req.body);
    if (!updated.length) return res.status(404).json({ error: "User not found" });
    res.json({ message: "User updated", user: updated[0] });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { register, login, getAllUsers, getUser, updateUser };
