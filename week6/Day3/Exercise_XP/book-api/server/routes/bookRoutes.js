const express = require("express");
const router = express.Router();
const {
  getAllBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook
} = require("../controllers/bookController");

router.get("/", getAllBooks);        // GET all books
router.get("/:bookId", getBookById); // GET one book
router.post("/", createBook);        // POST new book
router.put("/:bookId", updateBook);  // UPDATE book
router.delete("/:bookId", deleteBook); // DELETE book

module.exports = router;
