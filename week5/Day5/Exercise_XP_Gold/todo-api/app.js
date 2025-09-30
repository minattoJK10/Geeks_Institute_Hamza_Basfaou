import express from "express";
import { v4 as uuidv4 } from "uuid";


const app = express();
const PORT = 5000;

app.use(express.json());

// In-memory array to store todos
let todos = [];

// ------------------ ROUTES ------------------

// GET all todos
app.get("/api/todos", (req, res) => {
  res.json(todos);
});

// GET a single todo by ID
app.get("/api/todos/:id", (req, res) => {
  const todo = todos.find((t) => t.id === req.params.id);
  if (!todo) return res.status(404).json({ message: "Todo not found" });
  res.json(todo);
});

// CREATE a new todo
app.post("/api/todos", (req, res) => {
  const { title, completed } = req.body;
  if (!title) return res.status(400).json({ message: "Title is required" });

  const newTodo = {
    id: uuidv4(),
    title,
    completed: completed || false,
  };
  todos.push(newTodo);
  res.status(201).json(newTodo);
});

// UPDATE a todo by ID
app.put("/api/todos/:id", (req, res) => {
  const todo = todos.find((t) => t.id === req.params.id);
  if (!todo) return res.status(404).json({ message: "Todo not found" });

  const { title, completed } = req.body;
  if (title !== undefined) todo.title = title;
  if (completed !== undefined) todo.completed = completed;

  res.json(todo);
});

// DELETE a todo by ID
app.delete("/api/todos/:id", (req, res) => {
  const index = todos.findIndex((t) => t.id === req.params.id);
  if (index === -1) return res.status(404).json({ message: "Todo not found" });

  const deletedTodo = todos.splice(index, 1);
  res.json({ message: "Todo deleted", todo: deletedTodo[0] });
});

// ------------------ Start Server ------------------
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
