// routes/books.js
const express = require("express");
const router = express.Router();

// In-memory database
let books = [];
let idCounter = 1;

// ✅ Get all books
router.get("/", (req, res) => {
  res.json(books);
});

// ✅ Add a new book
router.post("/", (req, res) => {
  const { title, author } = req.body;

  if (!title || !author) {
    return res.status(400).json({ message: "Title and author are required" });
  }

  const newBook = { id: idCounter++, title, author };
  books.push(newBook);
  res.status(201).json(newBook);
});

// ✅ Update a book by ID
router.put("/:id", (req, res) => {
  const { id } = req.params;
  const { title, author } = req.body;

  const book = books.find((b) => b.id === parseInt(id));
  if (!book) {
    return res.status(404).json({ message: "Book not found" });
  }

  if (title !== undefined) book.title = title;
  if (author !== undefined) book.author = author;

  res.json(book);
});

// ✅ Delete a book by ID
router.delete("/:id", (req, res) => {
  const { id } = req.params;
  const index = books.findIndex((b) => b.id === parseInt(id));

  if (index === -1) {
    return res.status(404).json({ message: "Book not found" });
  }

  const deleted = books.splice(index, 1);
  res.json({ message: "Book deleted", deleted });
});

module.exports = router;
