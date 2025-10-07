const fs = require("fs");
const bcrypt = require("bcrypt");
const path = require("path");

const usersFile = path.join(__dirname, "../data/users.json");

// Lire les utilisateurs depuis le fichier
function readUsers() {
  try {
    const data = fs.readFileSync(usersFile, "utf-8");
    return JSON.parse(data);
  } catch (err) {
    return [];
  }
}

// Écrire dans le fichier
function writeUsers(users) {
  fs.writeFileSync(usersFile, JSON.stringify(users, null, 2));
}

// 📍 REGISTER
exports.register = async (req, res) => {
  const { name, lastName, email, username, password } = req.body;

  if (!name || !lastName || !email || !username || !password) {
    return res.status(400).json({ message: "All fields are required!" });
  }

  let users = readUsers();

  // Vérifier si username ou email déjà existant
  const exists = users.find(u => u.username === username || u.email === email);
  if (exists) {
    return res.status(400).json({ message: "⚠️ Username or email already exists" });
  }

  // Hash du mot de passe
  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = {
    id: users.length ? users[users.length - 1].id + 1 : 1,
    name,
    lastName,
    email,
    username,
    password: hashedPassword
  };

  users.push(newUser);
  writeUsers(users);

  res.json({ message: "✅ Registration successful!", user: { id: newUser.id, username: newUser.username } });
};

// 📍 LOGIN
exports.login = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: "Username and password required!" });
  }

  let users = readUsers();

  const user = users.find(u => u.username === username);
  if (!user) {
    return res.status(400).json({ message: "❌ User not registered!" });
  }

  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    return res.status(401).json({ message: "❌ Incorrect password!" });
  }

  res.json({ message: "✅ Login successful!", user: { id: user.id, username: user.username } });
};

// 📍 GET all users
exports.getAllUsers = (req, res) => {
  let users = readUsers();
  res.json(users);
};

// 📍 GET user by id
exports.getUserById = (req, res) => {
  let users = readUsers();
  const user = users.find(u => u.id === parseInt(req.params.id));
  if (!user) return res.status(404).json({ message: "User not found" });
  res.json(user);
};

// 📍 UPDATE user
exports.updateUser = (req, res) => {
  let users = readUsers();
  const index = users.findIndex(u => u.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ message: "User not found" });

  users[index] = { ...users[index], ...req.body };
  writeUsers(users);

  res.json({ message: "✅ User updated", user: users[index] });
};