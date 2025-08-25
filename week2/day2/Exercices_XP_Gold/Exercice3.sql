-- ==========================================
-- Exercise 3: Items and Customers
-- ==========================================
select * from Items;
select * from Customers;

-- =========================
-- Part I: Create purchases table
-- =========================
CREATE TABLE IF NOT EXISTS purchases (
    id SERIAL PRIMARY KEY,
    fk_customer_id INT NOT NULL,
    fk_item_id INT NOT NULL,
    quantity_purchased INT NOT NULL,
    FOREIGN KEY (fk_customer_id) REFERENCES customers(customer_id),
    FOREIGN KEY (fk_item_id) REFERENCES items(item_id)
);

-- =========================
-- Part I: Insert purchases using subqueries
-- =========================

-- 1. Scott Scott bought 1 fan
INSERT INTO purchases (fk_customer_id, fk_item_id, quantity_purchased)
VALUES (
    (SELECT customer_id FROM customers WHERE first_name='Scott' AND last_name='Scott'),
    (SELECT item_id FROM items WHERE item_name='Fan'),
    1
);

-- 2. Melanie Johnson bought 10 large desks
INSERT INTO purchases (fk_customer_id, fk_item_id, quantity_purchased)
VALUES (
    (SELECT customer_id FROM customers WHERE first_name='Melanie' AND last_name='Johnson'),
    (SELECT item_id FROM items WHERE item_name='Large Desk'),
    10
);

-- 3. Greg Jones bought 2 small desks
INSERT INTO purchases (fk_customer_id, fk_item_id, quantity_purchased)
VALUES (
    (SELECT customer_id FROM customers WHERE first_name='Greg' AND last_name='Jones'),
    (SELECT item_id FROM items WHERE item_name='Small Desk'),
    2
);

-- =========================
-- Part II: Queries
-- =========================

-- 1. All purchases
SELECT * FROM purchases;

-- 2. All purchases joining with customers and items
SELECT p.id AS purchase_id,
       c.first_name,
       c.last_name,
       i.item_name,
       p.quantity_purchased
FROM purchases p
JOIN customers c ON p.fk_customer_id = c.customer_id
JOIN items i ON p.fk_item_id = i.item_id;

-- 3. Purchases of the customer with ID = 5
SELECT p.id AS purchase_id,
       c.first_name,
       c.last_name,
       i.item_name,
       p.quantity_purchased
FROM purchases p
JOIN customers c ON p.fk_customer_id = c.customer_id
JOIN items i ON p.fk_item_id = i.item_id
WHERE c.customer_id = 5;

-- 4. Purchases for a large desk AND a small desk
SELECT p.id AS purchase_id,
       c.first_name,
       c.last_name,
       i.item_name,
       p.quantity_purchased
FROM purchases p
JOIN items i ON p.fk_item_id = i.item_id
JOIN customers c ON p.fk_customer_id = c.customer_id
WHERE i.item_name IN ('Large Desk', 'Small Desk');

-- 5. Show all customers who have made a purchase
SELECT DISTINCT c.first_name,
                c.last_name,
                i.item_name
FROM purchases p
JOIN customers c ON p.fk_customer_id = c.customer_id
JOIN items i ON p.fk_item_id = i.item_id;

-- 6. Attempt to insert a purchase without referencing an item
-- This will fail because fk_item_id is NOT NULL and has a foreign key constraint
/*
INSERT INTO purchases (fk_customer_id, fk_item_id, quantity_purchased)
VALUES (
    (SELECT customer_id FROM customers WHERE first_name='Scott' AND last_name='Scott'),
    NULL,
    1
);
*/
-- Explanation: You cannot insert NULL into fk_item_id due to NOT NULL and foreign key constraints.
