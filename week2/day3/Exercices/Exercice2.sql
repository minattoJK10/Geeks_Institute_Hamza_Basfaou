-- ========================================================
-- Exercise 2: DVD Rental
-- ========================================================

-- 1. Use UPDATE to change the language of some films
-- Example: Change film_id = 10 to French (language_id = 2)
UPDATE film
SET language_id = 2
WHERE film_id = 10;

-- --------------------------------------------------------
-- 2. Which foreign keys are defined for the customer table?
--    - store_id (references store.store_id)
--    - address_id (references address.address_id)
-- Meaning: when inserting into customer, you must use a valid store_id and address_id
-- Example valid INSERT:
 INSERT INTO customer (store_id, first_name, last_name, email, address_id, active)
 VALUES (1, 'Ali', 'Baba', 'ali@example.com', 5, 1 );

-- --------------------------------------------------------
-- 3. Drop the customer_review table
-- This is possible only if no other table depends on it
DROP TABLE customer_review;

-- --------------------------------------------------------
-- 4. Find how many rentals are still outstanding (not returned yet)
SELECT COUNT(*) AS outstanding_rentals
FROM rental
WHERE return_date IS NULL;

-- --------------------------------------------------------
-- 5. Find the 30 most expensive movies still outstanding
SELECT f.film_id, f.title, f.replacement_cost
FROM rental r
JOIN inventory i ON r.inventory_id = i.inventory_id
JOIN film f ON i.film_id = f.film_id
WHERE r.return_date IS NULL
ORDER BY f.replacement_cost DESC
LIMIT 30;

-- --------------------------------------------------------
-- 6. Find your friend’s 4 movies
-- (a) The film is about a sumo wrestler, and one of the actors is Penelope Monroe
SELECT DISTINCT f.title
FROM film f
JOIN film_actor fa ON f.film_id = fa.film_id
JOIN actor a ON fa.actor_id = a.actor_id
WHERE a.first_name = 'Penelope' AND a.last_name = 'Monroe'
  AND f.description ILIKE '%sumo wrestler%';

-- (b) A short documentary (< 1 hour), rated “R”
SELECT f.title
FROM film f
WHERE f.length < 60
  AND f.rating = 'R'
  AND f.description ILIKE '%documentary%';

-- (c) A film that Matthew Mahan rented, paid > $4, and returned between July 28–Aug 1, 2005
SELECT DISTINCT f.title
FROM payment p
JOIN rental r ON p.rental_id = r.rental_id
JOIN inventory i ON r.inventory_id = i.inventory_id
JOIN film f ON i.film_id = f.film_id
JOIN customer c ON p.customer_id = c.customer_id
WHERE c.first_name = 'Matthew' AND c.last_name = 'Mahan'
  AND p.amount > 4.00
  AND r.return_date BETWEEN '2005-07-28' AND '2005-08-01';

-- (d) Another film Matthew Mahan watched, title/description has "boat",
-- and replacement_cost is very high (let’s assume > 25)
SELECT DISTINCT f.title
FROM rental r
JOIN inventory i ON r.inventory_id = i.inventory_id
JOIN film f ON i.film_id = f.film_id
JOIN customer c ON r.customer_id = c.customer_id
WHERE c.first_name = 'Matthew' AND c.last_name = 'Mahan'
  AND (f.title ILIKE '%boat%' OR f.description ILIKE '%boat%')
  AND f.replacement_cost > 25;