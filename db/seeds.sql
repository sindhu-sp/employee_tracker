INSERT INTO department (d_name)
VALUES
('HR'),
('Engineering'),
('Sales'),
('Finance'),
('Legal'),
('Marketing'),
('Security'),
('Service and Support');

INSERT INTO emp_role (title, salary, department_id)
VALUES
('Engineer', 150000, 2),
('Attorney', 250000, 5),
('Sales Head', 350000, 3),
('Finance Lead', 100000, 4),
('Marketing Manager', 150000, 5),
('HR clerk', 90000, 1),
('Security Officer', 200000, 7),
('Customer Representative', 60000, 8);


INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
  ('Ronald', 'Firbank', 2, NULL),
  ('Virginia', 'Woolf', 1, 1),
  ('Piers', 'Gaveston', 3, 1),
  ('Charles', 'LeRoi', 4, 1),
  ('Katherine', 'Mansfield',5, 1),
  ('Dora', 'Carrington', 6, 1),
  ('Edward', 'Bellamy', 8, 1),
  ('Unica', 'Zurn', 7, 1);