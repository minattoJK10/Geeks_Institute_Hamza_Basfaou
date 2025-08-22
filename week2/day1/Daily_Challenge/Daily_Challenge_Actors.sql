-- Database: Hollywood

-- DROP DATABASE IF EXISTS "Hollywood";
/*
CREATE DATABASE "Hollywood"
    WITH
    OWNER = postgres
    ENCODING = 'UTF8'
    LC_COLLATE = 'fr-FR'
    LC_CTYPE = 'fr-FR'
    LOCALE_PROVIDER = 'libc'
    TABLESPACE = pg_default
    CONNECTION LIMIT = -1
    IS_TEMPLATE = False;
*/
CREATE TABLE actors(
 actor_id SERIAL PRIMARY KEY,
 first_name VARCHAR (50) NOT NULL,
 last_name VARCHAR (100) NOT NULL,
 age DATE NOT NULL,
 number_oscars SMALLINT NOT NULL
)

-- Vérifier que la table est vide
SELECT * FROM actors;

-- ==================================================
-- 3. Insertion de données initiales
-- ==================================================
INSERT INTO actors (first_name, last_name, age, number_oscars)
VALUES ('Matt', 'Damon', '1970-10-08', 5);

INSERT INTO actors (first_name, last_name, age, number_oscars)
VALUES ('George', 'Clooney', '1961-05-06', 2);

-- Exercice : Ajouter 2 actrices (une par une)
INSERT INTO actors (first_name, last_name, age, number_oscars)
VALUES ('Meryl', 'Streep', '1949-06-22', 3);

INSERT INTO actors (first_name, last_name, age, number_oscars)
VALUES ('Natalie', 'Portman', '1981-06-09', 1);

-- Exercice : Ajouter 3 acteurs dans une seule requête
INSERT INTO actors (first_name, last_name, age, number_oscars)
VALUES 
    ('Leonardo', 'DiCaprio', '1974-11-11', 1),
    ('Scarlett', 'Johansson', '1984-11-22', 0),
    ('Tom', 'Hanks', '1956-07-09', 2);

-- Vérification
SELECT * FROM actors;

-- ==================================================
-- 4. Exercices de SELECT
-- ==================================================

-- a) Récupérer seulement les prénoms
SELECT first_name FROM actors;

-- b) Récupérer prénom, nom et date de naissance
SELECT first_name, last_name, age FROM actors;

-- c) Trouver Matt uniquement
SELECT * FROM actors WHERE first_name = 'Matt';

-- d) Acteurs avec au moins 3 oscars
SELECT * FROM actors WHERE number_oscars >= 3;

-- e) Les noms de famille sauf pour Matt
SELECT last_name FROM actors WHERE first_name != 'Matt';

-- f) Condition AND (Matt Damon existe)
SELECT first_name, last_name FROM actors
WHERE first_name = 'Matt' AND last_name = 'Damon';

-- g) Condition AND (Matt Clooney n’existe pas → 0 résultat)
SELECT first_name, last_name FROM actors
WHERE first_name = 'Matt' AND last_name = 'Clooney';

-- h) Recherche avec LIKE
SELECT * FROM actors WHERE last_name LIKE '%mon%';

-- i) Nom de famille qui finit par 'y'
SELECT first_name FROM actors WHERE last_name LIKE '%y';

-- j) Recherche insensible à la casse (ILIKE)
SELECT first_name FROM actors WHERE last_name ILIKE 'da%';

-- k) Limiter les résultats
SELECT * FROM actors LIMIT 1;

-- l) Limiter avec condition et OFFSET
SELECT * FROM actors WHERE age > '1960-01-01' LIMIT 3 OFFSET 2;

-- m) Trier par prénom ASC
SELECT * FROM actors WHERE age > '1960-01-01' ORDER BY first_name ASC;

-- ==================================================
-- 5. Exercices demandés
-- ==================================================

-- a) Les 4 premiers acteurs
SELECT * FROM actors LIMIT 4;

-- b) Les 4 premiers acteurs triés DESC par last_name
SELECT * FROM actors ORDER BY last_name DESC LIMIT 4;

-- c) Acteurs avec 'e' dans le prénom
SELECT * FROM actors WHERE first_name ILIKE '%e%';

-- d) Acteurs avec au moins 5 oscars
SELECT * FROM actors WHERE number_oscars >= 5;

-- ==================================================
-- 6. UPDATE
-- ==================================================

-- a) Modifier l’âge de Matt Damon
UPDATE actors
SET age = '1970-01-01'
WHERE first_name = 'Matt' AND last_name = 'Damon';

-- b) Modifier avec RETURNING (affiche les lignes modifiées)
UPDATE actors
SET age = '1970-01-01'
WHERE first_name = 'Matt' AND last_name = 'Damon'
RETURNING actor_id, first_name, last_name, age;

-- c) Modifier prénom de Matt Damon → Maty
UPDATE actors
SET first_name = 'Maty'
WHERE first_name = 'Matt' AND last_name = 'Damon';


-- d) Modifier nombre d’oscars de George Clooney → 4 et retourner la ligne
UPDATE actors
SET number_oscars = 4
WHERE first_name = 'George' AND last_name = 'Clooney'
RETURNING actor_id, first_name, last_name, number_oscars;

-- e) Renommer la colonne "age" → "birthdate"
ALTER TABLE actors RENAME COLUMN age TO birthdate;

-- f) Supprimer un acteur et retourner la ligne
DELETE FROM actors WHERE actor_id = 4
RETURNING actor_id, first_name, last_name, number_oscars;

-- ==================================================
-- 7. Daily Challenge: Actors
-- ==================================================

-- 1. Compter le nombre d’acteurs
SELECT COUNT(*) AS total_actors FROM actors;

-- 2. Essayer d’ajouter un acteur avec des champs vides
-- Résultat attendu : ERREUR car les colonnes sont NOT NULL
INSERT INTO actors (first_name, last_name, birthdate, number_oscars)
VALUES (NULL, NULL, NULL, NULL);
/*ERROR:  une valeur NULL viole la contrainte NOT NULL de la colonne « first_name » dans la relation « actors »
La ligne en échec contient (8, null, null, null, null). 

ERREUR:  une valeur NULL viole la contrainte NOT NULL de la colonne « first_name » dans la relation « actors »
SQL state: 23502
Detail: La ligne en échec contient (8, null, null, null, null).*/
