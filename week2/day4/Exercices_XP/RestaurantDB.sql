-- Database: restaurant

-- DROP DATABASE IF EXISTS restaurant;

CREATE DATABASE restaurant
    WITH
    OWNER = postgres
    ENCODING = 'UTF8'
    LC_COLLATE = 'fr-FR'
    LC_CTYPE = 'fr-FR'
    LOCALE_PROVIDER = 'libc'
    TABLESPACE = pg_default
    CONNECTION LIMIT = -1
    IS_TEMPLATE = False;
--Creation Table Menu_Items
CREATE TABLE Menu_Items (
    item_id SERIAL PRIMARY KEY,
    item_name VARCHAR(30) NOT NULL,
    item_price SMALLINT DEFAULT 0
);
SELECT * FROM menu_items;

Delete FROM menu_items where item_id=1;