// routes/posts.js
const express = require('express');
const router = express.Router();

// In-memory "database"
let posts = [];
let idCounter = 1;

// ✅ GET all posts
router.get('/', (req, res) => {
  res.json(posts);
});

// ✅ GET post by ID
router.get('/:id', (req, res) => {
  const post = posts.find(p => p.id === parseInt(req.params.id));
  if (!post) {
    return res.status(404).json({ error: 'Post not found' });
  }
  res.json(post);
});

// ✅ POST create a new post
router.post('/', (req, res) => {
  const { title, content } = req.body;

  // validation
  if (!title || !content) {
    return res.status(400).json({ error: 'Title and content are required' });
  }

  const newPost = {
    id: idCounter++,
    title,
    content,
    timestamp: new Date()
  };

  posts.push(newPost);
  res.status(201).json(newPost);
});

// ✅ PUT update a post by ID
router.put('/:id', (req, res) => {
  const post = posts.find(p => p.id === parseInt(req.params.id));
  if (!post) {
    return res.status(404).json({ error: 'Post not found' });
  }

  const { title, content } = req.body;

  if (!title || !content) {
    return res.status(400).json({ error: 'Title and content are required' });
  }

  post.title = title;
  post.content = content;
  post.timestamp = new Date();

  res.json(post);
});

// ✅ DELETE post by ID
router.delete('/:id', (req, res) => {
  const index = posts.findIndex(p => p.id === parseInt(req.params.id));
  if (index === -1) {
    return res.status(404).json({ error: 'Post not found' });
  }

  const deletedPost = posts.splice(index, 1);
  res.json({ message: 'Post deleted', deletedPost });
});

module.exports = router;
