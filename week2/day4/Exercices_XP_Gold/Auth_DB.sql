-- Database: auth_system

-- DROP DATABASE IF EXISTS auth_system;

CREATE DATABASE auth_system
    WITH
    OWNER = postgres
    ENCODING = 'UTF8'
    LC_COLLATE = 'fr-FR'
    LC_CTYPE = 'fr-FR'
    LOCALE_PROVIDER = 'libc'
    TABLESPACE = pg_default
    CONNECTION LIMIT = -1
    IS_TEMPLATE = False;

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL
);

INSERT INTO users VALUES (Hamza,1234);