-- =====================================================
-- 1. How many stores there are, and in which city/country they are located
SELECT s.store_id, ci.city, co.country
FROM store s
JOIN address a ON s.address_id = a.address_id
JOIN city ci ON a.city_id = ci.city_id
JOIN country co ON ci.country_id = co.country_id;

-- =====================================================
-- 2. How many hours of viewing time per store (sum of film lengths)
-- Exclude unreturned rentals
SELECT s.store_id,
       SUM(f.length) AS total_minutes,
       ROUND(SUM(f.length) / 60.0, 2) AS total_hours,
       ROUND(SUM(f.length) / 1440.0, 2) AS total_days
FROM store s
JOIN inventory i ON s.store_id = i.store_id
JOIN film f ON i.film_id = f.film_id
WHERE i.inventory_id NOT IN (
    SELECT r.inventory_id
    FROM rental r
    WHERE r.return_date IS NULL
)
GROUP BY s.store_id;

-- =====================================================
-- 3. List of all customers in the cities where the stores are located
SELECT DISTINCT c.customer_id, c.first_name, c.last_name, ci.city
FROM customer c
JOIN address a ON c.address_id = a.address_id
JOIN city ci ON a.city_id = ci.city_id
WHERE ci.city_id IN (
    SELECT ci.city_id
    FROM store s
    JOIN address a ON s.address_id = a.address_id
    JOIN city ci ON a.city_id = ci.city_id
);

-- =====================================================
-- 4. List of all customers in the countries where the stores are located
SELECT DISTINCT c.customer_id, c.first_name, c.last_name, co.country
FROM customer c
JOIN address a ON c.address_id = a.address_id
JOIN city ci ON a.city_id = ci.city_id
JOIN country co ON ci.country_id = co.country_id
WHERE co.country_id IN (
    SELECT co.country_id
    FROM store s
    JOIN address a ON s.address_id = a.address_id
    JOIN city ci ON a.city_id = ci.city_id
    JOIN country co ON ci.country_id = co.country_id
);

-- =====================================================
-- 5. "Safe list" of movies (exclude Horror category and scary words)
SELECT f.film_id, f.title, f.description, f.length
FROM film f
JOIN film_category fc ON f.film_id = fc.film_id
JOIN category cat ON fc.category_id = cat.category_id
WHERE cat.name <> 'Horror'
  AND f.title NOT ILIKE '%beast%'
  AND f.title NOT ILIKE '%monster%'
  AND f.title NOT ILIKE '%ghost%'
  AND f.title NOT ILIKE '%dead%'
  AND f.title NOT ILIKE '%zombie%'
  AND f.title NOT ILIKE '%undead%'
  AND f.description NOT ILIKE '%beast%'
  AND f.description NOT ILIKE '%monster%'
  AND f.description NOT ILIKE '%ghost%'
  AND f.description NOT ILIKE '%dead%'
  AND f.description NOT ILIKE '%zombie%'
  AND f.description NOT ILIKE '%undead%';

-- Get the total safe viewing time in minutes, hours, and days
SELECT SUM(f.length) AS total_minutes,
       ROUND(SUM(f.length) / 60.0, 2) AS total_hours,
       ROUND(SUM(f.length) / 1440.0, 2) AS total_days
FROM film f
JOIN film_category fc ON f.film_id = fc.film_id
JOIN category cat ON fc.category_id = cat.category_id
WHERE cat.name <> 'Horror'
  AND f.title NOT ILIKE '%beast%'
  AND f.title NOT ILIKE '%monster%'
  AND f.title NOT ILIKE '%ghost%'
  AND f.title NOT ILIKE '%dead%'
  AND f.title NOT ILIKE '%zombie%'
  AND f.title NOT ILIKE '%undead%'
  AND f.description NOT ILIKE '%beast%'
  AND f.description NOT ILIKE '%monster%'
  AND f.description NOT ILIKE '%ghost%'
  AND f.description NOT ILIKE '%dead%'
  AND f.description NOT ILIKE '%zombie%'
  AND f.description NOT ILIKE '%undead%';
