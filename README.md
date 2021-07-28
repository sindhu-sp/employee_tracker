# employee_tracker

## About this challenge

- In this challenge it is to build a command-line application to manage a company's employee database, using Node.js, Inquirer, and MySQL.


## User Story

- As a business owner, the user wants to be able to view and manage the departments, roles, and employees in my company
so that they can organize and plan my business.


## Criteria

- A command-line application that accepts user input
- When starting the application, then the user is presented with the following options: 
* view all departments, 
* view all roles, 
* view all employees, 
* add a department, 
* add a role, 
* add an employee,
* update an employee role

- When the user chooses to view all departments, then presented with a formatted table showing department names and department ids
- When the user choose to view all roles, then presented with the job title, role id, the department that role belongs to, and the salary for that role
- When the user chooses to view all employees, then presented with a formatted table showing employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to
- When the user chooses to add a department, then prompted to enter the name of the department and that department is added to the database
- When the user chooses to add a role, then prompted to enter the name, salary, and department for the role and that role is added to the database
- When the user chooses to add an employee, then prompted to enter the employee’s first name, last name, role, and manager and that employee is added to the database
- When the user chooses to update an employee role, then prompted to select an employee to update and their new role and this information is updated in the database 



## The Program Guidelines

- The schema should contain the following three tables:
### Department
- id: INT PRIMARY KEY
- name: VARCHAR(30) to hold department name
### Role
- id: INT PRIMARY KEY
- title: VARCHAR(30) to hold role title
- salary: DECIMAL to hold role salary
- department_id: INT to hold reference to department role belongs to
### Employee
- id: INT PRIMARY KEY
- first_name: VARCHAR(30) to hold employee first name
- last_name: VARCHAR(30) to hold employee last name
- role_id: INT to hold reference to employee role
- manager_id: INT to hold reference to another employee that is manager of the current employee. This field might be null if the employee   has no manager.
-  A separate file containing functions for performing specific SQL queries.
-  A constructor function or class could be helpful for organizing these. 
- A seeds.sql file to pre-populate your database. 


## The recording of the working program


## Github Repository URL
https://github.com/sindhu-sp/employee_tracker


## Technologies Used:
- MySQL
- Inquirer
- Node.js

## Contributor
* Sindhu Pillai