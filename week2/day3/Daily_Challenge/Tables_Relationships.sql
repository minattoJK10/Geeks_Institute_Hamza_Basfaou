-- ============================================================
-- Database: DailyChallengeDay3
-- ============================================================

-- DROP DATABASE IF EXISTS "DailyChallengeDay3";

CREATE DATABASE "DailyChallengeDay3"
    WITH
    OWNER = postgres
    ENCODING = 'UTF8'
    LC_COLLATE = 'fr-FR'
    LC_CTYPE = 'fr-FR'
    LOCALE_PROVIDER = 'libc'
    TABLESPACE = pg_default
    CONNECTION LIMIT = -1
    IS_TEMPLATE = False;

-- ============================================================
-- PART I: Customer & Customer Profile (One-to-One relationship)
-- ============================================================

-- 1. Create Customer table
CREATE TABLE Customer (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL
);

-- 2. Create CustomerProfile table (1-to-1 with Customer)
CREATE TABLE CustomerProfile (
    id SERIAL PRIMARY KEY,
    isLoggedIn BOOLEAN DEFAULT FALSE,
    customer_id INT UNIQUE,
    CONSTRAINT fk_customer FOREIGN KEY (customer_id)
        REFERENCES Customer(id) ON DELETE CASCADE
);

-- 3. Insert customers
INSERT INTO Customer (first_name, last_name) VALUES
('John', 'Doe'),
('Jerome', 'Lalu'),
('Lea', 'Rive');

-- 4. Insert customer profiles (using subqueries)
INSERT INTO CustomerProfile (isLoggedIn, customer_id)
VALUES (TRUE, (SELECT id FROM Customer WHERE first_name = 'John'));

INSERT INTO CustomerProfile (isLoggedIn, customer_id)
VALUES (FALSE, (SELECT id FROM Customer WHERE first_name = 'Jerome'));

-- ------------------------------------------------------------
-- Queries

-- A. The first_name of LoggedIn customers
SELECT c.first_name
FROM Customer c
JOIN CustomerProfile cp ON c.id = cp.customer_id
WHERE cp.isLoggedIn = TRUE;

-- B. All customers with isLoggedIn (LEFT JOIN to include those without a profile)
SELECT c.first_name, cp.isLoggedIn
FROM Customer c
LEFT JOIN CustomerProfile cp ON c.id = cp.customer_id;

-- C. The number of customers that are not LoggedIn
SELECT COUNT(*) AS not_logged_in_count
FROM CustomerProfile
WHERE isLoggedIn = FALSE;


-- ============================================================
-- PART II: Books, Students & Library (Many-to-Many relationship)
-- ============================================================

-- 1. Create Book table
CREATE TABLE Book (
    book_id SERIAL PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    author VARCHAR(100) NOT NULL
);

-- Insert books
INSERT INTO Book (title, author) VALUES
('Alice In Wonderland', 'Lewis Carroll'),
('Harry Potter', 'J.K Rowling'),
('To kill a mockingbird', 'Harper Lee');

-- 2. Create Student table
CREATE TABLE Student (
    student_id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL UNIQUE,
    age INT CHECK (age <= 15) -- age must be <= 15
);

-- Insert students
INSERT INTO Student (name, age) VALUES
('John', 12),
('Lera', 11),
('Patrick', 10),
('Bob', 14);

-- 3. Create Library (junction table Many-to-Many)
CREATE TABLE Library (
    book_fk_id INT,
    student_fk_id INT,
    borrowed_date DATE,
    PRIMARY KEY (book_fk_id, student_fk_id, borrowed_date),
    CONSTRAINT fk_book FOREIGN KEY (book_fk_id)
        REFERENCES Book(book_id) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT fk_student FOREIGN KEY (student_fk_id)
        REFERENCES Student(student_id) ON DELETE CASCADE ON UPDATE CASCADE
);

-- 4. Insert records into Library (using subqueries)
INSERT INTO Library (book_fk_id, student_fk_id, borrowed_date)
VALUES (
    (SELECT book_id FROM Book WHERE title = 'Alice In Wonderland'),
    (SELECT student_id FROM Student WHERE name = 'John'),
    '2022-02-15'
);

INSERT INTO Library (book_fk_id, student_fk_id, borrowed_date)
VALUES (
    (SELECT book_id FROM Book WHERE title = 'To kill a mockingbird'),
    (SELECT student_id FROM Student WHERE name = 'Bob'),
    '2021-03-03'
);

INSERT INTO Library (book_fk_id, student_fk_id, borrowed_date)
VALUES (
    (SELECT book_id FROM Book WHERE title = 'Alice In Wonderland'),
    (SELECT student_id FROM Student WHERE name = 'Lera'),
    '2021-05-23'
);

INSERT INTO Library (book_fk_id, student_fk_id, borrowed_date)
VALUES (
    (SELECT book_id FROM Book WHERE title = 'Harry Potter'),
    (SELECT student_id FROM Student WHERE name = 'Bob'),
    '2021-08-12'
);

-- ------------------------------------------------------------
-- Queries

-- A. Select all columns from the junction table
SELECT * FROM Library;

-- B. Select student name and book title of borrowed books
SELECT s.name AS student_name, b.title AS book_title, l.borrowed_date
FROM Library l
JOIN Student s ON l.student_fk_id = s.student_id
JOIN Book b ON l.book_fk_id = b.book_id;

-- C. Select average age of children that borrowed "Alice in Wonderland"
SELECT AVG(s.age) AS avg_age
FROM Library l
JOIN Student s ON l.student_fk_id = s.student_id
JOIN Book b ON l.book_fk_id = b.book_id
WHERE b.title = 'Alice In Wonderland';

-- D. Delete a student and check what happens in Library
DELETE FROM Student WHERE name = 'Bob';

-- --> Because of ON DELETE CASCADE,
--     all borrow records for Bob are also deleted from Library.
