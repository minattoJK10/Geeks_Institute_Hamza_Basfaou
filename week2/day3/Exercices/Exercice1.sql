-- ========================================================
-- Exercise 1: DVD Rental
-- ========================================================

-- 1. Get a list of all the languages, from the language table
SELECT language_id, name
FROM language;

-- --------------------------------------------------------
-- 2. Get a list of all films joined with their languages
--    (title, description, language name)
SELECT f.title, f.description, l.name AS language_name
FROM film f
JOIN language l ON f.language_id = l.language_id;

-- --------------------------------------------------------
-- 3. Get all languages, even if there are no films
--    Use LEFT JOIN (film may be NULL)
SELECT f.title, f.description, l.name AS language_name
FROM language l
LEFT JOIN film f ON f.language_id = l.language_id;

-- --------------------------------------------------------
-- 4. Create a new table called new_film (id, name)
CREATE TABLE new_film (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL
);

-- Add some films
INSERT INTO new_film (name) VALUES ('Samurai Legend');
INSERT INTO new_film (name) VALUES ('Ocean Mystery');
INSERT INTO new_film (name) VALUES ('Sky Adventure');

-- --------------------------------------------------------
-- 5. Create a new table called customer_review
--    Reviews are linked to films and languages
--    If a film is deleted, its reviews should also be deleted (ON DELETE CASCADE)
CREATE TABLE customer_review (
    review_id SERIAL PRIMARY KEY,
    film_id INT NOT NULL,
    language_id INT NOT NULL,
    title VARCHAR(255),
    score INT CHECK(score BETWEEN 1 AND 10),
    review_text TEXT,
    last_update TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_film FOREIGN KEY (film_id)
        REFERENCES new_film(id) ON DELETE CASCADE,
    CONSTRAINT fk_language FOREIGN KEY (language_id)
        REFERENCES language(language_id)
);

-- --------------------------------------------------------
-- 6. Add 2 movie reviews linked to valid films & languages
INSERT INTO customer_review (film_id, language_id, title, score, review_text)
VALUES (1, 1, 'Epic Story', 9, 'Really enjoyed Samurai Legend!');

INSERT INTO customer_review (film_id, language_id, title, score, review_text)
VALUES (2, 2, 'Underwater Drama', 8, 'Ocean Mystery was thrilling!');

-- --------------------------------------------------------
-- 7. Delete a film that has a review
-- Example: delete film with id = 1
DELETE FROM new_film WHERE id = 1;

-- --> Because of ON DELETE CASCADE, the related review in customer_review is also deleted.
