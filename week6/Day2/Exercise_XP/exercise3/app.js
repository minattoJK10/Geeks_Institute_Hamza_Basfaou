// app.js
const express = require("express");
const app = express();

// Middleware to parse JSON
app.use(express.json());

// Import the books router
const booksRouter = require("./routes/books");

// Mount the router at /books
app.use("/books", booksRouter);

// Start server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
