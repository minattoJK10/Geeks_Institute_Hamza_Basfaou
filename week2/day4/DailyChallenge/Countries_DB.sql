-- Database: countries_db

-- DROP DATABASE IF EXISTS countries_db;

CREATE DATABASE countries_db
    WITH
    OWNER = postgres
    ENCODING = 'UTF8'
    LC_COLLATE = 'fr-FR'
    LC_CTYPE = 'fr-FR'
    LOCALE_PROVIDER = 'libc'
    TABLESPACE = pg_default
    CONNECTION LIMIT = -1
    IS_TEMPLATE = False;

CREATE TABLE countries (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) UNIQUE,
    capital VARCHAR(100),
    flag VARCHAR(10),
    subregion VARCHAR(100),
    population BIGINT
);

SELECT * FROM countries;