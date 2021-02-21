
DROP DATABASE IF EXISTS employeeDB;

CREATE DATABASE employeeDB;

USE employeeDB;

CREATE TABLE department (
     id INTEGER PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(30)
);

CREATE TABLE role (
   id INTEGER PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL(8,2) NOT NULL,
    dept_id INT NOT NULL,
    CONSTRAINT FK_department FOREIGN KEY(dept_id) REFERENCES department(id) ON DELETE CASCADE
);

CREATE TABLE employee (
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT NOT NULL,
    CONSTRAINT FK_role FOREIGN KEY(role_id) REFERENCES role(id) ON DELETE CASCADE,
    manager_id INT,
    manager_name VARCHAR(61),
    CONSTRAINT FK_manager FOREIGN KEY(manager_id) REFERENCES employee(id) ON DELETE SET NULL
);

/*
SELECT * FROM employee;
SELECT * FROM role;
SELECT * FROM department;
*/