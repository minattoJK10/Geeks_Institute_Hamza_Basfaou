-- ==========================================
-- Exercise 2: Students Table - Updates, Deletes, Grades
-- ==========================================



-- 1. Update birth_dates for twins Marc and Lea Benichou
UPDATE students
SET birth_date = '1998-11-02'
WHERE first_name IN ('Marc', 'Lea') AND last_name = 'Benichou';

-- 2. Change last_name of David from 'Grez' to 'Guez'
UPDATE students
SET last_name = 'Guez'
WHERE first_name = 'David';

-- 3. Delete the student named 'Lea Benichou'
DELETE FROM students
WHERE first_name = 'Lea' AND last_name = 'Benichou';

-- 4. Count total students in the table
SELECT COUNT(*) AS total_students
FROM students;

-- 5. Count students born after 1/01/2000
SELECT COUNT(*) AS students_after_2000
FROM students
WHERE birth_date > '2000-01-01';

-- 6. Add a new column 'math_grade' to the students table
ALTER TABLE students
ADD math_grade INT;

-- 7. Assign math grades
-- Add 80 to student with id = 1
UPDATE students SET math_grade = 80 WHERE id = 1;

-- Add 90 to students with ids 2 or 4
UPDATE students SET math_grade = 90 WHERE id IN (2,4);

-- Add 40 to student with id = 6
UPDATE students SET math_grade = 40 WHERE id = 6;

-- 8. Count how many students have a grade bigger than 83
SELECT COUNT(*) AS high_grade_students
FROM students
WHERE math_grade > 83;

-- 9. Add another Omer Simpson with same birth_date, grade 70
INSERT INTO students (first_name, last_name, birth_date, math_grade)
SELECT first_name, last_name, birth_date, 70
FROM students
WHERE first_name = 'Omer' AND last_name = 'Simpson'
LIMIT 1;

-- 10. Bonus: Count how many grades each student has
SELECT first_name, last_name, COUNT(math_grade) AS total_grade
FROM students
GROUP BY first_name, last_name;

-- 11. Find the sum of all students' grades
SELECT SUM(math_grade) AS sum_grades
FROM students;
