-- =====================================================
-- 1. Get a list of all rentals which are out
-- (not yet returned → return_date IS NULL)
SELECT r.rental_id, r.rental_date, c.first_name, c.last_name, f.title
FROM rental r
JOIN inventory i ON r.inventory_id = i.inventory_id
JOIN film f ON i.film_id = f.film_id
JOIN customer c ON r.customer_id = c.customer_id
WHERE r.return_date IS NULL;

-- =====================================================
-- 2. Get a list of all customers who have not returned rentals
-- (Group by customer to avoid duplicates)
SELECT c.customer_id, c.first_name, c.last_name, COUNT(r.rental_id) AS unreturned_count
FROM rental r
JOIN customer c ON r.customer_id = c.customer_id
WHERE r.return_date IS NULL
GROUP BY c.customer_id, c.first_name, c.last_name
ORDER BY unreturned_count DESC;

-- =====================================================
-- 3. Get a list of all Action films with actor Joe Swank
-- (We need film_category → category to filter Action films,
-- and film_actor → actor to filter Joe Swank)
SELECT f.title, f.description
FROM film f
JOIN film_category fc ON f.film_id = fc.film_id
JOIN category cat ON fc.category_id = cat.category_id
JOIN film_actor fa ON f.film_id = fa.film_id
JOIN actor a ON fa.actor_id = a.actor_id
WHERE cat.name = 'Action'
  AND a.first_name = 'Joe'
  AND a.last_name = 'Swank';

-- =====================================================
-- TIP: Shortcut
-- We could create a VIEW for “unreturned rentals” to simplify queries:
CREATE OR REPLACE VIEW v_unreturned_rentals AS
SELECT r.rental_id, r.customer_id, r.inventory_id, r.rental_date
FROM rental r
WHERE r.return_date IS NULL;
-- Then reuse this VIEW in later queries
