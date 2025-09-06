-- Database: Event_Management_DB

-- DROP DATABASE IF EXISTS "Event_Management_DB";

CREATE DATABASE "Event_Management_DB"
    WITH
    OWNER = postgres
    ENCODING = 'UTF8'
    LC_COLLATE = 'fr-FR'
    LC_CTYPE = 'fr-FR'
    LOCALE_PROVIDER = 'libc'
    TABLESPACE = pg_default
    CONNECTION LIMIT = -1
    IS_TEMPLATE = False;
-- Event Management System Database Schema & Seed Data
-- Créé pour PostgreSQL

-- Supprimer les tables si elles existent (dans l'ordre inverse des dépendances)
DROP TABLE IF EXISTS tickets CASCADE;
DROP TABLE IF EXISTS events CASCADE;
DROP TABLE IF EXISTS organizers CASCADE;
DROP TABLE IF EXISTS attendees CASCADE;

-- 1. Table Organizers (doit être créée en premier car Events en dépend)
CREATE TABLE organizers (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    phone VARCHAR(20),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. Table Events (référence organizers)
CREATE TABLE events (
    id SERIAL PRIMARY KEY,
    name VARCHAR(200) NOT NULL,
    date DATE NOT NULL,
    time TIME,
    location VARCHAR(200) NOT NULL,
    description TEXT,
    max_attendees INTEGER DEFAULT 100,
    organizer_id INTEGER REFERENCES organizers(id) ON DELETE CASCADE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 3. Table Attendees (indépendante)
CREATE TABLE attendees (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    phone VARCHAR(20),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 4. Table Tickets (relation Many-to-Many entre Events et Attendees)
CREATE TABLE tickets (
    id SERIAL PRIMARY KEY,
    event_id INTEGER REFERENCES events(id) ON DELETE CASCADE,
    attendee_id INTEGER REFERENCES attendees(id) ON DELETE CASCADE,
    registration_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    ticket_status VARCHAR(20) DEFAULT 'confirmed',
    UNIQUE(event_id, attendee_id) -- Un attendee ne peut pas s'inscrire 2x au même event
);

-- Index pour améliorer les performances
CREATE INDEX idx_events_date ON events(date);
CREATE INDEX idx_events_organizer ON events(organizer_id);
CREATE INDEX idx_tickets_event ON tickets(event_id);
CREATE INDEX idx_tickets_attendee ON tickets(attendee_id);

-- ===========================
-- SEED DATA - INSERTIONS
-- ===========================

-- Insertion des Organizers (10 organizers comme demandé)
INSERT INTO organizers (name, email, phone) VALUES
('Tech Events Morocco', 'contact@techevents.ma', '+212661234567'),
('Casablanca Conference Center', 'info@casacc.com', '+212522987654'),
('Digital Nomads Rabat', 'hello@digitalnomads.ma', '+212537123456'),
('Startup Ecosystem Marrakech', 'team@startupmarrakech.org', '+212524567890'),
('Women in Tech Morocco', 'admin@womentech.ma', '+212661987654'),
('AI Morocco Community', 'contact@aimorocco.org', '+212522334455'),
('Green Tech Initiative', 'info@greentech.ma', '+212537998877'),
('Business Network Tanger', 'network@biztanger.com', '+212539112233'),
('Creative Hub Agadir', 'creative@hubagadir.ma', '+212528445566'),
('Innovation Lab Fes', 'lab@innovationfes.org', '+212535778899');

-- Insertion des Attendees (15 attendees comme demandé)
INSERT INTO attendees (name, email, phone) VALUES
('Youssef Benali', 'youssef.benali@email.com', '+212661111111'),
('Fatima Zahra El Mansouri', 'fatima.elmansouri@email.com', '+212662222222'),
('Ahmed Khalil', 'ahmed.khalil@email.com', '+212663333333'),
('Nadia Bouazza', 'nadia.bouazza@email.com', '+212664444444'),
('Omar Tazi', 'omar.tazi@email.com', '+212665555555'),
('Salma Berrada', 'salma.berrada@email.com', '+212666666666'),
('Karim El Fassi', 'karim.elfassi@email.com', '+212667777777'),
('Aicha Benkirane', 'aicha.benkirane@email.com', '+212668888888'),
('Mehdi Alaoui', 'mehdi.alaoui@email.com', '+212669999999'),
('Zineb Cherkaoui', 'zineb.cherkaoui@email.com', '+212661010101'),
('Hicham Bennani', 'hicham.bennani@email.com', '+212662020202'),
('Leila Amrani', 'leila.amrani@email.com', '+212663030303'),
('Rachid El Mokhtari', 'rachid.elmokhtari@email.com', '+212664040404'),
('Sara Idrissi', 'sara.idrissi@email.com', '+212665050505'),
('Abdellatif Senhaji', 'abdellatif.senhaji@email.com', '+212666060606');

-- Insertion des Events (10+ events comme demandé)
INSERT INTO events (name, date, time, location, description, max_attendees, organizer_id) VALUES
('Morocco Tech Summit 2025', '2025-10-15', '09:00', 'Casablanca Conference Center', 'Le plus grand événement tech du Maroc avec des speakers internationaux', 500, 1),
('AI & Machine Learning Workshop', '2025-09-20', '14:00', 'Université Hassan II, Casablanca', 'Workshop pratique sur l''intelligence artificielle et le machine learning', 50, 6),
('Digital Nomad Meetup', '2025-09-25', '18:30', 'Café Coworking, Rabat', 'Rencontre mensuelle des nomades digitaux au Maroc', 30, 3),
('Startup Pitch Competition', '2025-10-05', '10:00', 'Technopark Casablanca', 'Compétition de pitch pour les startups marocaines', 200, 4),
('Women in Tech Networking', '2025-09-30', '17:00', 'Sofitel Rabat', 'Soirée networking pour les femmes dans la tech', 80, 5),
('Green Tech Conference', '2025-11-10', '08:30', 'Mohammed V University, Rabat', 'Conférence sur les technologies vertes et durables', 300, 7),
('Blockchain & Cryptocurrency Seminar', '2025-10-20', '15:00', 'Marriott Hotel, Casablanca', 'Séminaire sur la blockchain et les cryptomonnaies', 100, 1),
('UX/UI Design Workshop', '2025-09-18', '13:00', 'Creative Space, Marrakech', 'Workshop pratique sur le design UX/UI', 25, 9),
('Business Network Breakfast', '2025-09-22', '08:00', 'Hotel Atlas, Tanger', 'Petit-déjeuner networking pour entrepreneurs', 60, 8),
('Innovation in Healthcare', '2025-11-05', '09:30', 'Faculty of Medicine, Fes', 'Conférence sur l''innovation dans le domaine de la santé', 150, 10),
('Cybersecurity Bootcamp', '2025-10-12', '09:00', 'INPT Rabat', 'Bootcamp intensif sur la cybersécurité', 40, 2),
('E-commerce Trends 2025', '2025-11-18', '16:00', 'Twin Center, Casablanca', 'Conférence sur les tendances e-commerce', 120, 4);

-- Insertion des Tickets (inscriptions variées pour créer des données réalistes)
INSERT INTO tickets (event_id, attendee_id, registration_date, ticket_status) VALUES
-- Morocco Tech Summit (event 1) - événement populaire
(1, 1, '2025-08-15 10:30:00', 'confirmed'),
(1, 2, '2025-08-16 14:20:00', 'confirmed'),
(1, 3, '2025-08-17 09:15:00', 'confirmed'),
(1, 5, '2025-08-20 16:45:00', 'confirmed'),
(1, 8, '2025-08-25 11:30:00', 'confirmed'),
(1, 10, '2025-08-28 13:20:00', 'confirmed'),
(1, 12, '2025-09-01 15:10:00', 'confirmed'),

-- AI Workshop (event 2)
(2, 4, '2025-08-10 12:00:00', 'confirmed'),
(2, 6, '2025-08-12 14:30:00', 'confirmed'),
(2, 9, '2025-08-15 10:45:00', 'confirmed'),
(2, 11, '2025-08-18 16:20:00', 'confirmed'),

-- Digital Nomad Meetup (event 3)
(3, 7, '2025-09-10 18:00:00', 'confirmed'),
(3, 13, '2025-09-12 19:30:00', 'confirmed'),
(3, 15, '2025-09-15 17:45:00', 'confirmed'),

-- Startup Pitch (event 4) - événement populaire
(4, 1, '2025-08-20 09:30:00', 'confirmed'),
(4, 3, '2025-08-22 11:15:00', 'confirmed'),
(4, 5, '2025-08-25 14:20:00', 'confirmed'),
(4, 7, '2025-08-28 16:30:00', 'confirmed'),
(4, 9, '2025-09-01 10:45:00', 'confirmed'),
(4, 14, '2025-09-03 13:20:00', 'confirmed'),

-- Women in Tech (event 5)
(5, 2, '2025-09-05 12:00:00', 'confirmed'),
(5, 4, '2025-09-08 15:30:00', 'confirmed'),
(5, 6, '2025-09-10 17:15:00', 'confirmed'),
(5, 10, '2025-09-12 14:45:00', 'confirmed'),

-- Green Tech Conference (event 6)
(6, 8, '2025-09-20 11:30:00', 'confirmed'),
(6, 11, '2025-09-22 13:45:00', 'confirmed'),
(6, 13, '2025-09-25 15:20:00', 'confirmed'),

-- Blockchain Seminar (event 7)
(7, 12, '2025-09-18 16:30:00', 'confirmed'),
(7, 14, '2025-09-20 18:15:00', 'confirmed'),
(7, 15, '2025-09-22 19:45:00', 'confirmed'),

-- UX/UI Workshop (event 8)
(8, 1, '2025-08-25 10:00:00', 'confirmed'),
(8, 6, '2025-08-28 12:30:00', 'confirmed'),

-- Business Breakfast (event 9)
(9, 3, '2025-09-01 07:30:00', 'confirmed'),
(9, 7, '2025-09-03 07:45:00', 'confirmed'),
(9, 11, '2025-09-05 08:00:00', 'confirmed'),

-- Healthcare Innovation (event 10)
(10, 2, '2025-10-01 14:20:00', 'confirmed'),
(10, 4, '2025-10-03 16:30:00', 'confirmed'),
(10, 8, '2025-10-05 11:15:00', 'confirmed');

-- ===========================
-- REQUÊTES DE VÉRIFICATION
-- ===========================

-- Vérifier les données insérées
SELECT 'ORGANIZERS COUNT:' as info, COUNT(*) as count FROM organizers
UNION ALL
SELECT 'EVENTS COUNT:', COUNT(*) FROM events
UNION ALL
SELECT 'ATTENDEES COUNT:', COUNT(*) FROM attendees
UNION ALL
SELECT 'TICKETS COUNT:', COUNT(*) FROM tickets;

-- Afficher quelques statistiques utiles
SELECT 
    e.name as event_name,
    COUNT(t.id) as registered_attendees,
    e.max_attendees,
    o.name as organizer
FROM events e
LEFT JOIN tickets t ON e.id = t.event_id
JOIN organizers o ON e.organizer_id = o.id
GROUP BY e.id, e.name, e.max_attendees, o.name
ORDER BY registered_attendees DESC;