-- =========================
-- DAILY CHALLENGE: Items and Orders
-- =========================

-- Product Orders table
CREATE TABLE product_orders (
    order_id SERIAL PRIMARY KEY,
    order_date DATE DEFAULT CURRENT_DATE
);

-- Items table
CREATE TABLE items (
    item_id SERIAL PRIMARY KEY,
    product_name VARCHAR(100) NOT NULL,
    price NUMERIC(10,2) NOT NULL CHECK (price >= 0),
    order_id INT REFERENCES product_orders(order_id) ON DELETE CASCADE
);

-- Insert example data
INSERT INTO product_orders DEFAULT VALUES;
INSERT INTO items (product_name, price, order_id)
VALUES ('Keyboard', 50.00, 1),
       ('Mouse', 25.00, 1),
       ('Monitor', 150.00, 1);

-- Function: total price for a given order
CREATE OR REPLACE FUNCTION get_order_total(orderId INT)
RETURNS NUMERIC AS $$
    SELECT COALESCE(SUM(price),0) FROM items WHERE order_id = orderId;
$$ LANGUAGE SQL;

-- Test the function
SELECT get_order_total(1);

-- BONUS: Users table
CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL
);

ALTER TABLE product_orders
ADD COLUMN user_id INT REFERENCES users(user_id) ON DELETE CASCADE;

-- Example data
INSERT INTO users (username) VALUES ('Hamza'), ('Ali');
INSERT INTO product_orders (user_id) VALUES (1), (2);

INSERT INTO items (product_name, price, order_id)
VALUES ('Laptop', 800.00, 2),
       ('Headset', 70.00, 2);

-- Function: total price for a given order of a given user
CREATE OR REPLACE FUNCTION get_user_order_total(userId INT, orderId INT)
RETURNS NUMERIC AS $$
    SELECT COALESCE(SUM(i.price),0)
    FROM items i
    JOIN product_orders po ON i.order_id = po.order_id
    WHERE po.user_id = userId AND po.order_id = orderId;
$$ LANGUAGE SQL;

-- Test
SELECT get_user_order_total(2, 2);