const Book = require("../models/bookModel");

const getAllBooks = (req, res) => {
  res.status(200).json(Book.getAll());
};

const getBookById = (req, res) => {
  const id = parseInt(req.params.bookId);
  const book = Book.getById(id);
  if (!book) return res.status(404).json({ error: "Book not found" });
  res.status(200).json(book);
};

const createBook = (req, res) => {
  const { title, author, publishedYear } = req.body;
  if (!title || !author || !publishedYear) {
    return res.status(400).json({ error: "Missing required fields" });
  }
  const newBook = Book.create({ title, author, publishedYear });
  res.status(201).json(newBook);
};

const updateBook = (req, res) => {
  const id = parseInt(req.params.bookId);
  const updatedBook = Book.update(id, req.body);
  if (!updatedBook) return res.status(404).json({ error: "Book not found" });
  res.status(200).json(updatedBook);
};

const deleteBook = (req, res) => {
  const id = parseInt(req.params.bookId);
  const deletedBook = Book.remove(id);
  if (!deletedBook) return res.status(404).json({ error: "Book not found" });
  res.status(200).json({ message: "Book deleted", book: deletedBook });
};

module.exports = {
  getAllBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook
};
