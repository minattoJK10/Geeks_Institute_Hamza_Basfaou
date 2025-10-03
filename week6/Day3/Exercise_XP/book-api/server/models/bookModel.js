let books = [
  { id: 1, title: "The Great Gatsby", author: "F. Scott Fitzgerald", publishedYear: 1925 },
  { id: 2, title: "To Kill a Mockingbird", author: "Harper Lee", publishedYear: 1960 },
  { id: 3, title: "1984", author: "George Orwell", publishedYear: 1949 }
];

const Book = {
  getAll: () => books,
  getById: (id) => books.find(b => b.id === id),
  create: (book) => {
    book.id = books.length ? books[books.length - 1].id + 1 : 1;
    books.push(book);
    return book;
  },
  update: (id, data) => {
    const index = books.findIndex(b => b.id === id);
    if (index === -1) return null;
    books[index] = { ...books[index], ...data };
    return books[index];
  },
  remove: (id) => {
    const index = books.findIndex(b => b.id === id);
    if (index === -1) return null;
    const removed = books[index];
    books.splice(index, 1);
    return removed;
  }
};

module.exports = Book;
