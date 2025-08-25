-- Database: dvdrental

-- DROP DATABASE IF EXISTS dvdrental;

CREATE DATABASE dvdrental
    WITH
    OWNER = postgres
    ENCODING = 'UTF8'
    LC_COLLATE = 'fr-FR'
    LC_CTYPE = 'fr-FR'
    LOCALE_PROVIDER = 'libc'
    TABLESPACE = pg_default
    CONNECTION LIMIT = -1
    IS_TEMPLATE = False;

-- ===========================================
-- Exercise 1: DVD Rental
-- Author: Hamza Basfaou
-- ===========================================

-- 1. Find out how many films there are for each rating
SELECT rating, COUNT(*) AS film_count
FROM film
GROUP BY rating;

-- ===========================================
-- 2. Get a list of all the movies that have a rating of G or PG-13
SELECT film_id, title, rating
FROM film
WHERE rating IN ('G', 'PG-13');

-- ===========================================
-- 3. Filter movies further:
--    - Rating must be G or PG-13
--    - Length under 2 hours (120 minutes)
--    - Rental rate under 3.00
--    - Sorted alphabetically by title
SELECT film_id, title, rating, length, rental_rate
FROM film
WHERE rating IN ('G', 'PG-13')
  AND length < 120
  AND rental_rate < 3.00
ORDER BY title;

-- ===========================================
-- 4. Update a customer’s details with your own details
-- Example: Updating customer_id = 5
UPDATE customer
SET first_name = 'Hamza',
    last_name  = 'Basfaou',
    email      = 'hamza2000basf@gmail.com'
WHERE customer_id = 5;

-- ===========================================
-- 5. Update the address of that customer
-- First, get the customer’s address_id
-- SELECT address_id FROM customer WHERE customer_id = 5;
-- Suppose it returns address_id = 12

UPDATE address
SET address     = '123 Main Street',
    address2    = 'Apartment 5B',
    district    = 'Casablanca',
    postal_code = '20250',
    phone       = '0612345678'
WHERE address_id = 12;

-- ===========================================
-- End of Script
-- ===========================================
