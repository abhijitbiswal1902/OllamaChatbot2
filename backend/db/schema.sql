-- Drop if exists
DROP TABLE IF EXISTS enrollments;
DROP TABLE IF EXISTS students;
DROP TABLE IF EXISTS instructors;
DROP TABLE IF EXISTS courses;
DROP TABLE IF EXISTS departments;

-- Departments
CREATE TABLE departments (
    dept_id INTEGER PRIMARY KEY,
    name TEXT NOT NULL
);

-- Instructors
CREATE TABLE instructors (
    instructor_id INTEGER PRIMARY KEY,
    name TEXT NOT NULL,
    dept_id INTEGER,
    FOREIGN KEY (dept_id) REFERENCES departments(dept_id)
);

-- Courses
CREATE TABLE courses (
    course_id INTEGER PRIMARY KEY,
    name TEXT NOT NULL,
    dept_id INTEGER,
    instructor_id INTEGER,
    FOREIGN KEY (dept_id) REFERENCES departments(dept_id),
    FOREIGN KEY (instructor_id) REFERENCES instructors(instructor_id)
);

-- Students
CREATE TABLE students (
    student_id INTEGER PRIMARY KEY,
    name TEXT NOT NULL,
    gender TEXT,
    dept_id INTEGER,
    FOREIGN KEY (dept_id) REFERENCES departments(dept_id)
);

-- Enrollments
CREATE TABLE enrollments (
    enrollment_id INTEGER PRIMARY KEY,
    student_id INTEGER,
    course_id INTEGER,
    grade TEXT,
    FOREIGN KEY (student_id) REFERENCES students(student_id),
    FOREIGN KEY (course_id) REFERENCES courses(course_id)
);

-- Sample Data: Departments
INSERT INTO departments (name) VALUES 
('Computer Science'),
('Electronics'),
('Mechanical Engineering');

-- Sample Data: Instructors
INSERT INTO instructors (name, dept_id) VALUES 
('Dr. Anil Sharma', 1),
('Prof. Kavita Joshi', 2),
('Dr. Rajeev Menon', 3);

-- Sample Data: Courses
INSERT INTO courses (name, dept_id, instructor_id) VALUES 
('Data Structures', 1, 1),
('Digital Circuits', 2, 2),
('Thermodynamics', 3, 3);

-- Sample Data: Students
INSERT INTO students (name, gender, dept_id) VALUES 
('Arpit', 'Male', 1),
('iSHA', 'Female', 1),
('Abhijit', 'Male', 2),
('Aditya', 'Male', 3);

-- Sample Data: Enrollments
INSERT INTO enrollments (student_id, course_id, grade) VALUES 
(1, 1, 'A'),
(2, 1, 'B+'),
(3, 2, 'A-'),
(4, 3, 'B');
