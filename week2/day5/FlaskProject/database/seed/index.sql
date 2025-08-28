-- Drop existing tables (for repeatable seeding)
DROP TABLE IF EXISTS books_authors;
DROP TABLE IF EXISTS books;
DROP TABLE IF EXISTS authors;

-- Schema
CREATE TABLE authors (
    id SERIAL PRIMARY KEY,
    name VARCHAR(120) UNIQUE NOT NULL,
    bio TEXT,
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE books (
    id SERIAL PRIMARY KEY,
    title VARCHAR(200) NOT NULL,
    year INTEGER,
    category VARCHAR(80),
    image_url TEXT,
    rating INTEGER DEFAULT 0 CHECK (rating >= 0 AND rating <= 5),
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE books_authors (
    id SERIAL PRIMARY KEY,
    book_id INTEGER NOT NULL REFERENCES books(id) ON DELETE CASCADE,
    author_id INTEGER NOT NULL REFERENCES authors(id) ON DELETE CASCADE
);

-- Seed Authors (10+)
INSERT INTO authors (name, bio) VALUES
('Agatha Christie', 'British writer known for detective novels.'),
('J.K. Rowling', 'British author of the Harry Potter series.'),
('George Orwell', 'English novelist and essayist.'),
('J.R.R. Tolkien', 'Author of The Lord of the Rings.'),
('Jane Austen', 'English novelist known for realism and social commentary.'),
('Mark Twain', 'American writer and humorist.'),
('Leo Tolstoy', 'Russian writer regarded as one of the greatest authors.'),
('F. Scott Fitzgerald', 'American novelist.'),
('Harper Lee', 'American novelist known for To Kill a Mockingbird.'),
('Ernest Hemingway', 'American novelist and short-story writer.');

-- Seed Books (10+)
INSERT INTO books (title, year, category, image_url, rating) VALUES
('Murder on the Orient Express', 1934, 'Mystery', NULL, 5),
('Harry Potter and the Sorcerer''s Stone', 1997, 'Fantasy', NULL, 5),
('1984', 1949, 'Dystopian', NULL, 5),
('The Lord of the Rings: The Fellowship of the Ring', 1954, 'Fantasy', NULL, 5),
('Pride and Prejudice', 1813, 'Romance', NULL, 4),
('Adventures of Huckleberry Finn', 1884, 'Adventure', NULL, 4),
('War and Peace', 1869, 'Historical', NULL, 4),
('The Great Gatsby', 1925, 'Tragedy', NULL, 5),
('To Kill a Mockingbird', 1960, 'Southern Gothic', NULL, 5),
('The Old Man and the Sea', 1952, 'Literary', NULL, 4);

-- Many-to-Many links
-- (Each book linked to at least one author)
INSERT INTO books_authors (book_id, author_id) VALUES
(1, 1),  -- Christie
(2, 2),  -- Rowling
(3, 3),  -- Orwell
(4, 4),  -- Tolkien
(5, 5),  -- Austen
(6, 6),  -- Twain
(7, 7),  -- Tolstoy
(8, 8),  -- Fitzgerald
(9, 9),  -- Harper Lee
(10, 10);-- Hemingway
