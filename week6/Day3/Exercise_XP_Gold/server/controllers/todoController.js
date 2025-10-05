import { v4 as uuidv4 } from "uuid";
import Todo from "../models/todoModel.js";

export const getTodos = async (req, res) => {
  try {
    const todos = await Todo.getAll();
    res.json(todos);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getTodoById = async (req, res) => {
  try {
    const todo = await Todo.getById(req.params.id);
    if (!todo) return res.status(404).json({ error: "Todo not found" });
    res.json(todo);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const createTodo = async (req, res) => {
  try {
    const { title } = req.body;
    if (!title) return res.status(400).json({ error: "Title is required" });

    const newTodo = {
      id: uuidv4(),
      title,
      completed: false,
    };
    const inserted = await Todo.create(newTodo);
    res.status(201).json(inserted[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateTodo = async (req, res) => {
  try {
    const { title, completed } = req.body;
    const updated = await Todo.update(req.params.id, { title, completed });
    if (!updated.length) return res.status(404).json({ error: "Todo not found" });
    res.json(updated[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const deleteTodo = async (req, res) => {
  try {
    const deleted = await Todo.remove(req.params.id);
    if (!deleted.length) return res.status(404).json({ error: "Todo not found" });
    res.json({ message: "Todo deleted", deleted: deleted[0] });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
