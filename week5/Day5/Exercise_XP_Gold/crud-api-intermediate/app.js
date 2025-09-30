const express = require("express");
const axios = require("axios");

const app = express();
const PORT = 5000;

// Middleware to parse JSON
app.use(express.json());

// Base URL for JSONPlaceholder
const API_URL = "https://jsonplaceholder.typicode.com/posts";

// ------------------ CRUD Endpoints ------------------

// READ ALL POSTS
app.get("/api/posts", async (req, res) => {
  try {
    const response = await axios.get(API_URL);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ message: "Error fetching posts" });
  }
});

// READ SINGLE POST
app.get("/api/posts/:id", async (req, res) => {
  try {
    const response = await axios.get(`${API_URL}/${req.params.id}`);
    res.json(response.data);
  } catch (error) {
    res.status(404).json({ message: "Post not found" });
  }
});

// CREATE POST
app.post("/api/posts", async (req, res) => {
  try {
    const response = await axios.post(API_URL, req.body);
    res.status(201).json(response.data);
  } catch (error) {
    res.status(500).json({ message: "Error creating post" });
  }
});

// UPDATE POST
app.put("/api/posts/:id", async (req, res) => {
  try {
    const response = await axios.put(`${API_URL}/${req.params.id}`, req.body);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ message: "Error updating post" });
  }
});

// DELETE POST
app.delete("/api/posts/:id", async (req, res) => {
  try {
    await axios.delete(`${API_URL}/${req.params.id}`);
    res.json({ message: "Post deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting post" });
  }
});

// ------------------ Start Server ------------------
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
