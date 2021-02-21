INSERT INTO department (name) 
VALUES ('Sales'),
('Engineering'),
('Finance'),
('Legal');

INSERT INTO role (title, salary, dept_id)
 VALUES ('Sales Lead',10000, 1),
 ('Salesperson',8000, 1),
 ('Lead Engineer',15000, 2),
 ('Sofware Engineer',12000, 2),
 ('Accountant',12500, 3),
 ('Legal Tem Lead',25000, 4),
 ('Lawyer',19000, 4);


INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
('Walter', 'Skinner',1,null),
('Dana','Scully',2,1),
('Fox','Mulder',2,1),
('Eugene','Tooms',2,3),
('Josh','Exley',3,1),
('Jimmy','Bond',3,5),
('John ','Byers',4,null),
('Melvin','Frohike',4,5),
('Richard','Langley',4,5);

  