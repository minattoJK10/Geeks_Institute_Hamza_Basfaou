-- Database: SQL Puzzle

-- DROP DATABASE IF EXISTS "SQL Puzzle";

CREATE DATABASE "SQL Puzzle"
    WITH
    OWNER = postgres
    ENCODING = 'UTF8'
    LC_COLLATE = 'fr-FR'
    LC_CTYPE = 'fr-FR'
    LOCALE_PROVIDER = 'libc'
    TABLESPACE = pg_default
    CONNECTION LIMIT = -1
    IS_TEMPLATE = False;

-- ==============================
-- Daily Challenge : SQL Puzzle
-- ==============================

-- Drop tables if they exist (clean start)
DROP TABLE IF EXISTS FirstTab;
DROP TABLE IF EXISTS SecondTab;

-- Create FirstTab
CREATE TABLE FirstTab (
     id integer, 
     name VARCHAR(10)
);

-- Insert data into FirstTab
INSERT INTO FirstTab VALUES
(5,'Pawan'),
(6,'Sharlee'),
(7,'Krish'),
(NULL,'Avtaar');

-- Check data
SELECT * FROM FirstTab;


-- Create SecondTab
CREATE TABLE SecondTab (
    id integer 
);

-- Insert data into SecondTab
INSERT INTO SecondTab VALUES
(5),
(NULL);

-- Check data
SELECT * FROM SecondTab;


-- ==========================
-- Questions
-- ==========================

-- Q1. Count rows where id NOT IN (select with NULL inside)
SELECT COUNT(*) AS Q1_Result
FROM FirstTab AS ft 
WHERE ft.id NOT IN (
    SELECT id FROM SecondTab WHERE id IS NULL
);

-- Q2. Count rows where id NOT IN (select only 5)
SELECT COUNT(*) AS Q2_Result
FROM FirstTab AS ft 
WHERE ft.id NOT IN (
    SELECT id FROM SecondTab WHERE id = 5
);

-- Q3. Count rows where id NOT IN (5, NULL)
SELECT COUNT(*) AS Q3_Result
FROM FirstTab AS ft 
WHERE ft.id NOT IN (
    SELECT id FROM SecondTab
);

-- Q4. Count rows where id NOT IN (only 5)
SELECT COUNT(*) AS Q4_Result
FROM FirstTab AS ft 
WHERE ft.id NOT IN (
    SELECT id FROM SecondTab WHERE id IS NOT NULL
);
