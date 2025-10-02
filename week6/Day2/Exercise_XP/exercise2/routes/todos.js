// routes/todos.js
const express = require("express");
const router = express.Router();

// In-memory "database"
let todos = [];
let idCounter = 1;

// ✅ Get all to-do items
router.get("/", (req, res) => {
  res.json(todos);
});

// ✅ Add a new to-do item
router.post("/", (req, res) => {
  const { title } = req.body;
  if (!title) {
    return res.status(400).json({ message: "Title is required" });
  }
  const newTodo = { id: idCounter++, title, completed: false };
  todos.push(newTodo);
  res.status(201).json(newTodo);
});

// ✅ Update a to-do item by ID
router.put("/:id", (req, res) => {
  const { id } = req.params;
  const { title, completed } = req.body;
  const todo = todos.find((t) => t.id === parseInt(id));

  if (!todo) {
    return res.status(404).json({ message: "Todo not found" });
  }

  if (title !== undefined) todo.title = title;
  if (completed !== undefined) todo.completed = completed;

  res.json(todo);
});

// ✅ Delete a to-do item by ID
router.delete("/:id", (req, res) => {
  const { id } = req.params;
  const index = todos.findIndex((t) => t.id === parseInt(id));

  if (index === -1) {
    return res.status(404).json({ message: "Todo not found" });
  }

  const deleted = todos.splice(index, 1);
  res.json({ message: "Todo deleted", deleted });
});

module.exports = router;
