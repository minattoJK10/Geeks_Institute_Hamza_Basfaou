// app.js
const express = require('express');
const app = express();
const path = require('path');
const greetRouter = require('./routes/greet');

// Middleware
app.use(express.urlencoded({ extended: true })); // to handle form data
app.use(express.static(path.join(__dirname, 'public'))); // optional for CSS

// Routes
app.use('/', greetRouter);

// Server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
