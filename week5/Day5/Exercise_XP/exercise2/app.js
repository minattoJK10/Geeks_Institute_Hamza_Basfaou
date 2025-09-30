const express = require('express');
const app = express();

// Middleware to parse JSON
app.use(express.json());

// Fake database (array of books)
let books = [
  { id: 1, title: "The Pragmatic Programmer", author: "Andrew Hunt", publishedYear: 1999 },
  { id: 2, title: "Clean Code", author: "Robert C. Martin", publishedYear: 2008 },
  { id: 3, title: "JavaScript: The Good Parts", author: "Douglas Crockford", publishedYear: 2008 },
];

// ✅ Read All Books
app.get('/api/books', (req, res) => {
  res.json(books);
});

// ✅ Read One Book by ID
app.get('/api/books/:bookId', (req, res) => {
  const bookId = parseInt(req.params.bookId);
  const book = books.find(b => b.id === bookId);

  if (!book) {
    return res.status(404).json({ message: "Book not found" });
  }

  res.json(book);
});

// ✅ Create a New Book
app.post('/api/books', (req, res) => {
  const { title, author, publishedYear } = req.body;

  if (!title || !author || !publishedYear) {
    return res.status(400).json({ message: "All fields are required: title, author, publishedYear" });
  }

  const newBook = {
    id: books.length + 1,
    title,
    author,
    publishedYear,
  };

  books.push(newBook);
  res.status(201).json(newBook);
});

// ✅ Update a Book
app.put('/api/books/:bookId', (req, res) => {
  const bookId = parseInt(req.params.bookId);
  const book = books.find(b => b.id === bookId);

  if (!book) {
    return res.status(404).json({ message: "Book not found" });
  }

  const { title, author, publishedYear } = req.body;

  if (title) book.title = title;
  if (author) book.author = author;
  if (publishedYear) book.publishedYear = publishedYear;

  res.json(book);
});

// ✅ Delete a Book
app.delete('/api/books/:bookId', (req, res) => {
  const bookId = parseInt(req.params.bookId);
  const index = books.findIndex(b => b.id === bookId);

  if (index === -1) {
    return res.status(404).json({ message: "Book not found" });
  }

  const deletedBook = books.splice(index, 1);
  res.json({ message: "Book deleted successfully", deletedBook });
});

// Start server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`📚 Book API is running on http://localhost:${PORT}`);
});
