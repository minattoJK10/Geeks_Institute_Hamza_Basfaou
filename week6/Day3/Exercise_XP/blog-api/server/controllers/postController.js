const Post = require("../models/postModel");

const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.getAll();
    res.json(posts);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch posts" });
  }
};

const getPostById = async (req, res) => {
  try {
    const post = await Post.getById(req.params.id);
    if (!post) return res.status(404).json({ error: "Post not found" });
    res.json(post);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch post" });
  }
};

const createPost = async (req, res) => {
  try {
    const [newPost] = await Post.create(req.body);
    res.status(201).json(newPost);
  } catch (err) {
    res.status(500).json({ error: "Failed to create post" });
  }
};

const updatePost = async (req, res) => {
  try {
    const [updated] = await Post.update(req.params.id, req.body);
    if (!updated) return res.status(404).json({ error: "Post not found" });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: "Failed to update post" });
  }
};

const deletePost = async (req, res) => {
  try {
    const deleted = await Post.remove(req.params.id);
    if (!deleted) return res.status(404).json({ error: "Post not found" });
    res.json({ message: "Post deleted" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete post" });
  }
};

module.exports = {
  getAllPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost
};
