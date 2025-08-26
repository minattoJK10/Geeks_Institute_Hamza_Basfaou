---------------------------------------------
-- Retrieve all films with a rating of G or PG, which are not currently rented
SELECT DISTINCT f.film_id, f.title, f.rating
FROM film f
JOIN inventory i ON f.film_id = i.film_id
LEFT JOIN rental r ON i.inventory_id = r.inventory_id
WHERE f.rating IN ('G', 'PG')
  AND (r.rental_id IS NULL OR r.return_date IS NOT NULL);

-----------------------------------------------
-- Create a new table for a waiting list (children’s movies)
CREATE TABLE children_waiting_list (
    waiting_id SERIAL PRIMARY KEY,
    film_id INT NOT NULL,
    customer_id INT NOT NULL,
    date_added TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_film FOREIGN KEY (film_id)
        REFERENCES film(film_id),
    CONSTRAINT fk_customer FOREIGN KEY (customer_id)
        REFERENCES customer(customer_id)
);

--------------------------------------------------
-- Retrieve the number of people waiting for each children’s DVD
SELECT f.film_id, f.title, COUNT(cwl.waiting_id) AS waiting_count
FROM film f
LEFT JOIN children_waiting_list cwl ON f.film_id = cwl.film_id
WHERE f.rating IN ('G', 'PG')
GROUP BY f.film_id, f.title
ORDER BY waiting_count DESC;
-----------------------------------------------------------------
-- Test with example inserts
-- Example: Add children to waiting list
INSERT INTO children_waiting_list (film_id, customer_id)
VALUES (1, 10), (1, 15), (2, 20);

-- Now run the waiting count query:
-- Expected: Film 1 has 2 children waiting, Film 2 has 1 child waiting.

