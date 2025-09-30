const express = require('express');
const app = express();

// Middleware to parse JSON
app.use(express.json());



// Fake database (array to store posts)
let posts = [
  { id: 1, title: "First Post", content: "This is my first blog post" },
  { id: 2, title: "Second Post", content: "This is my second blog post" },
];

// ✅ GET /posts - Retrieve all posts
app.get('/posts', (req, res) => {
  res.json(posts);
});

// ✅ GET /posts/:id - Retrieve a specific post
app.get('/posts/:id', (req, res) => {
  const post = posts.find(p => p.id === parseInt(req.params.id));
  if (!post) {
    return res.status(404).json({ message: "Post not found" });
  }
  res.json(post);
});

// ✅ POST /posts - Create a new post
app.post('/posts', (req, res) => {
  const { title, content } = req.body;

  if (!title || !content) {
    return res.status(400).json({ message: "Title and content are required" });
  }

  const newPost = {
    id: posts.length + 1,
    title,
    content,
  };

  posts.push(newPost);
  res.status(201).json(newPost);
});

// ✅ PUT /posts/:id - Update a post
app.put('/posts/:id', (req, res) => {
  const post = posts.find(p => p.id === parseInt(req.params.id));
  if (!post) {
    return res.status(404).json({ message: "Post not found" });
  }

  const { title, content } = req.body;
  if (title) post.title = title;
  if (content) post.content = content;

  res.json(post);
});

// ✅ DELETE /posts/:id - Delete a post
app.delete('/posts/:id', (req, res) => {
  const postIndex = posts.findIndex(p => p.id === parseInt(req.params.id));
  if (postIndex === -1) {
    return res.status(404).json({ message: "Post not found" });
  }

  const deletedPost = posts.splice(postIndex, 1);
  res.json({ message: "Post deleted successfully", deletedPost });
});

// ❌ Handle invalid routes
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`🚀 Blog API server running on http://localhost:${PORT}`);
});
