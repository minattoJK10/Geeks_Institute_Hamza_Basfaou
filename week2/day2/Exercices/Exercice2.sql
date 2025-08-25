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
--Select all the columns from the “customer” table
SELECT * 
FROM customer;
--Display names (first_name, last_name) using an alias named “full_name”
SELECT first_name || ' ' || last_name AS full_name
FROM customer;
--Select all the create_date from “customer” (no duplicates)
SELECT DISTINCT create_date
FROM customer;
--Get all customer details, ordered by first_name descending
SELECT * 
FROM customer
ORDER BY first_name DESC;
--Get film ID, title, description, release year, rental rate in ascending order by rental rate
SELECT film_id, title, description, release_year, rental_rate
FROM film
ORDER BY rental_rate ASC;
--Get address & phone of all customers living in “Texas”
SELECT address, phone
FROM address
WHERE district = 'Texas';
--Retrieve all movie details where movie id = 15 or 150
SELECT *
FROM film
WHERE film_id IN (15, 150);
--Check if your favorite movie exists (example: "ACADEMY DINOSAUR")
SELECT film_id, title, description, length, rental_rate
FROM film
WHERE title = 'Academy Dinosaur';
--Get all movies starting with first two letters of your favorite movie (example: "Ac")
SELECT film_id, title, description, length, rental_rate
FROM film
WHERE title LIKE 'Ac%';
--Find the 10 cheapest movies
SELECT *
FROM film
ORDER BY rental_rate ASC
LIMIT 10;
--Find the next 10 cheapest movies (without using LIMIT → use OFFSET)
SELECT *
FROM film
ORDER BY rental_rate ASC
OFFSET 10
LIMIT 10;
--Join customer + payment (get name, amount, date, ordered by customer_id)
SELECT c.customer_id, c.first_name, c.last_name, p.amount, p.payment_date
FROM customer c
JOIN payment p ON c.customer_id = p.customer_id
ORDER BY c.customer_id;
--Movies that are NOT in inventory
SELECT f.film_id, f.title
FROM film f
LEFT JOIN inventory i ON f.film_id = i.film_id
WHERE i.inventory_id IS NULL;
--Find which city is in which country
SELECT ci.city, co.country
FROM city ci
JOIN country co ON ci.country_id = co.country_id;
--Bonus: See seller (staff) performance
SELECT c.customer_id, c.first_name, c.last_name, p.amount, p.payment_date, p.staff_id
FROM customer c
JOIN payment p ON c.customer_id = p.customer_id
ORDER BY p.staff_id, c.customer_id;
