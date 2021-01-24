

CREATE TABLE employee (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT NOT NULL,
    manager_id INT,
    manager_name VARCHAR(61)
);


CREATE TABLE role (
   id INTEGER PRIMARY KEY AUTOINCREMENT,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL(8,2) NOT NULL,
    dept_id INT NOT NULL
);

CREATE TABLE department (
     id INTEGER PRIMARY KEY AUTOINCREMENT,
    name VARCHAR(30)
);

SELECT * FROM employee;
SELECT * FROM role;
SELECT * FROM department;