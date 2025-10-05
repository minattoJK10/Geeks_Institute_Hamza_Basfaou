const express = require("express");
const fs = require("fs");
const path = require("path");

const router = express.Router();
const filePath = path.join(__dirname, "../tasks.json");

// Helper: Read tasks from file
function readTasks() {
  try {
    const data = fs.readFileSync(filePath, "utf-8");
    return JSON.parse(data);
  } catch (err) {
    return [];
  }
}

// Helper: Write tasks to file
function writeTasks(tasks) {
  fs.writeFileSync(filePath, JSON.stringify(tasks, null, 2), "utf-8");
}

// GET /tasks - Retrieve all tasks
router.get("/", (req, res) => {
  const tasks = readTasks();
  res.json(tasks);
});

// GET /tasks/:id - Retrieve task by ID
router.get("/:id", (req, res) => {
  const tasks = readTasks();
  const task = tasks.find(t => t.id === parseInt(req.params.id));
  if (!task) return res.status(404).json({ error: "Task not found" });
  res.json(task);
});

// POST /tasks - Create a new task
router.post("/", (req, res) => {
  const { title, description } = req.body;
  if (!title || !description) {
    return res.status(400).json({ error: "Title and description are required" });
  }

  const tasks = readTasks();
  const newTask = {
    id: tasks.length > 0 ? tasks[tasks.length - 1].id + 1 : 1,
    title,
    description,
    completed: false,
  };
  tasks.push(newTask);
  writeTasks(tasks);
  res.status(201).json(newTask);
});

// PUT /tasks/:id - Update a task
router.put("/:id", (req, res) => {
  const { title, description, completed } = req.body;
  const tasks = readTasks();
  const taskIndex = tasks.findIndex(t => t.id === parseInt(req.params.id));

  if (taskIndex === -1) return res.status(404).json({ error: "Task not found" });

  if (!title || !description) {
    return res.status(400).json({ error: "Title and description are required" });
  }

  tasks[taskIndex] = {
    ...tasks[taskIndex],
    title,
    description,
    completed: completed !== undefined ? completed : tasks[taskIndex].completed,
  };

  writeTasks(tasks);
  res.json(tasks[taskIndex]);
});

// DELETE /tasks/:id - Delete a task
router.delete("/:id", (req, res) => {
  let tasks = readTasks();
  const taskIndex = tasks.findIndex(t => t.id === parseInt(req.params.id));

  if (taskIndex === -1) return res.status(404).json({ error: "Task not found" });

  const deletedTask = tasks.splice(taskIndex, 1)[0];
  writeTasks(tasks);
  res.json({ message: "Task deleted", deletedTask });
});

module.exports = router;
