// app.js
const express = require('express');
const app = express();
const postsRouter = require('./routes/posts');

app.use(express.json()); // middleware to parse JSON
app.use('/posts', postsRouter);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
