-- ==========================================
-- Exercise 1 : Bonus Public Database
-- ==========================================

-- 1. Fetch the last 2 customers in alphabetical order (A-Z)
-- Exclude the 'id' column
SELECT first_name, last_name
FROM customers
ORDER BY last_name ASC, first_name ASC
LIMIT 2;

-- 2. Delete all purchases made by Scott
DELETE FROM purchases
WHERE fk_customer_id = (
    SELECT customer_id FROM customers
    WHERE first_name = 'Scott' AND last_name = 'Scott'
);

-- 3. Check if Scott still exists in the customers table
-- (He should still exist, because we only deleted his purchases)
SELECT * FROM customers
WHERE first_name = 'Scott' AND last_name = 'Scott';

-- 4. Show all purchases (Scott’s order should appear, but without his name)
-- Use LEFT JOIN (purchases LEFT JOIN customers)
SELECT p.id AS purchase_id,
       c.first_name,
       c.last_name,
       p.quantity_purchased
FROM purchases p
LEFT JOIN customers c ON p.fk_customer_id = c.customer_id;

-- 5. Show all purchases, but exclude Scott’s order
-- Use INNER JOIN (only purchases that have matching customers)
SELECT p.id AS purchase_id,
       c.first_name,
       c.last_name,
       p.quantity_purchased
FROM purchases p
INNER JOIN customers c ON p.fk_customer_id = c.customer_id;
