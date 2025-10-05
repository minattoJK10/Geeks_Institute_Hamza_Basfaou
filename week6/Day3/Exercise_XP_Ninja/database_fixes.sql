-- Database fixes for quiz_db

-- 1. Change correct_answer column to TEXT for consistency
ALTER TABLE questions ALTER COLUMN correct_answer TYPE TEXT;

-- 2. Add options for question 1: "2 + x = 5 what is the value of x?"
INSERT INTO options (text) VALUES
('3'),
('5'),
('7'),
('10');

-- Assuming the new options get IDs 1,2,3,4 (but check actual IDs after insert)
-- Link question 1 to options 1-4
INSERT INTO questions_options (question_id, option_id) VALUES
(1, 1),
(1, 2),
(1, 3),
(1, 4);

-- Update correct_answer for question 1 to 2 (assuming '5' is option 2)
UPDATE questions SET correct_answer = '2' WHERE id = 1;

-- 3. Add options for question 2: "2 + 2 equals?"
INSERT INTO options (text) VALUES
('3'),
('4'),
('5'),
('6');

-- Assuming the new options get IDs 5,6,7,8
-- Link question 2 to options 5-8
INSERT INTO questions_options (question_id, option_id) VALUES
(2, 5),
(2, 6),
(2, 7),
(2, 8);

-- Update correct_answer for question 2 to 6 (assuming '4' is option 6)
UPDATE questions SET correct_answer = '6' WHERE id = 2;

-- Note: The actual option IDs may vary. After inserting options, check the IDs with:
-- SELECT * FROM options;
-- Then adjust the INSERT INTO questions_options and UPDATE statements accordingly.
