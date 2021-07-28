const mysql = require("mysql2");
const inquirer = require("inquirer");
const consoleTable = require('console.table');
let departments;

//Connect to database
const db = mysql.createConnection({
        host: "localhost",
        port: 3306,
        user: "root",
        password: "password",
        database: "employee_db",
    },
    console.log("Connected to the employee_db database")
);

db.connect(function (err) {
    if (err) throw err;
    begin();
});

// Menu Choice

function begin() {
    inquirer
        .prompt({
            name: "options",
            type: "list",
            message: "Choose an option from the list",
            choices: [
                "View All Departments",
                "View All Roles",
                "View All Employees",
                "Add A Department",
                "Add A Role",
                "Add An Employee",
                "Update An Employee Role",
                "Exit",
            ],
        })
        .then(function (answer) {
            switch (answer.options) {
                case "View All Departments":
                    departmentView();
                    break;
                case "View All Roles":
                    rolesView();
                    break;
                case "View All Employees":
                    employeesView();
                    break;
                case "Add A Department":
                    departmentAdd();
                    break;
                case "Add A Role":
                    roleAdd();
                    break;
                case "Add An Employee":
                    employeeAdd();
                    break;
                case "Update An Employee Role":
                    updateEmployeeRole();
                    break;
                case "Exit":
                    db.end();
                    break;
            }
        });
}

// View All Department

function departmentView() {
    db.query("SELECT * FROM department", function (err, res) {
        if (err) throw err;
        console.table(res);
        begin();
    });
}

// View All Roles

function rolesView() {
    db.query("SELECT emp_role.id, emp_role.title, emp_role.salary, department.d_name FROM emp_role RIGHT JOIN department ON emp_role.department_id=department.id ORDER BY emp_role.id", function (err, res) {
        if (err) throw err;
        console.table(res);
        begin();
    });
}

// View All Employees

function employeesView() {
    db.query(
        "SELECT employee.id, employee.first_name, employee.last_name, emp_role.title, emp_role.salary, employee.manager_id, department.d_name FROM employee INNER JOIN emp_role ON employee.role_id=emp_role.id INNER JOIN department ON emp_role.department_id=department.id ORDER BY employee.id",
        function (err, res) {
            if (err) throw err;
            console.table(res);
            begin();
        }
    );
}

// Add A Department

function departmentAdd() {
    inquirer
        .prompt({
            name: "department",
            type: "input",
            message: "Name of the new Department",
        })
        .then(function (answer) {
            console.log(answer.department);
            db.query(
                "INSERT INTO department SET ?", {
                    d_name: answer.department,
                },
                function (err, res) {
                    if (err) throw err;
                    // console.table(res);
                    // begin();
                    departmentView();
                }
            );
        });
}

//  Add A Role

function roleAdd() {
    db.query("SELECT * FROM department", function (err, res) {
        if (err) throw err;
        var question = [{
                name: "deptName",
                type: "list",
                message: "Which department the new role to be added?:  ",
                choices: function () {
                    var deptChoice = [];
                    res.forEach((res) => {
                        deptChoice.push(res.d_name);
                    });
                    return deptChoice;
                },
            },

            {
                name: "title",
                type: "input",
                message: "Employee's Role: ",
            },

            {
                name: "salary",
                type: "input",
                message: "Salary of the Role: ",
            },
        ];

        inquirer.prompt(question).then(function (answer) {
            const department = answer.deptName;

            db.query("SELECT * FROM department", function (err, res) {
                if (err) throw err;
                let dept = res.filter(function (res) {
                    return res.d_name == department;
                });
                let id = dept[0].id;
                let query =
                    "INSERT INTO emp_role (title, salary, department_id) VALUES (?, ?, ?)";
                let values = [answer.title, parseInt(answer.salary), id];
                console.log(values);
                db.query(query, values);
                rolesView();
                // console.table(res, );
            });
        });
    });
}

// Add An Employee

function employeeAdd() {
    db.query("SELECT * FROM emp_role", function (err, res) {
        if (err) throw err;
        var question = [{
                name: "first_name",
                type: "input",
                message: "Employee's First Name: ",
            },
            {
                name: "last_name",
                type: "input",
                message: "Employee's Last Name: ",
            },
            {
                name: "title",
                type: "list",
                message: "Employee's Role: ",
                choices: function () {
                    roleChoice = [];
                    res.forEach((res) => {
                        roleChoice.push(res.title);
                    });
                    return roleChoice;
                },
            },
        ];

        inquirer.prompt(question).then(function (answer) {
            console.log(answer);
            const role = answer.title;
            db.query("SELECT * FROM emp_role", function (err, res) {
                if (err) throw err;
                let roleOption = res.filter(function (res) {
                    return (res.title = role);
                });
                let roleId = roleOption[0].id;
                db.query("SELECT * FROM employee", function (err, res) {
                    inquirer
                        .prompt([{
                            name: "manager",
                            type: "list",
                            Message: "Manager's name: ",
                            choices: function () {
                                managerChoice = [];
                                res.forEach((res) => {
                                    managerChoice.push(res.last_name);
                                });
                                return managerChoice;
                            },
                        }, ])
                        .then(function (manage) {
                            const manager = manage.manager;
                            db.query("SELECT * FROM employee", function (err, res) {
                                if (err) throw err;
                                let managerOption = res.filter(function (res) {
                                    return res.last_name == manager;
                                });
                                let managerId = managerOption[0].id;
                                console.log(manage);
                                let query =
                                    "INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)";
                                let values = [
                                    answer.first_name,
                                    answer.last_name,
                                    roleId,
                                    managerId,
                                ];
                                console.log(values);
                                db.query(query, values);
                                employeesView();
                            });
                        });
                });
            });
        });
    });
}

function updateEmployeeRole() {
    db.query("SELECT * FROM employee", function (err, res) {
        if (err) throw err;
        var question = [{
            name: "employeeName",
            type: "list",
            message: "Which employee's role is changing?:  ",
            choices: function () {
                employeeChoice = [];
                res.forEach((res) => {
                    employeeChoice.push(res.last_name);
                });
                return employeeChoice;
            },
        }, ];

        inquirer.prompt(question).then(function (answer) {
            console.log(answer);
            const name = answer.employeeName;
            db.query("SELECT * FROM emp_role", function (err, res) {
                inquirer
                    .prompt([{
                        name: "role",
                        type: "list",
                        message: "The new role of the employee: ",
                        choices: function () {
                            roleOption = [];
                            res.forEach((res) => {
                                roleOption.push(res.title);
                            });
                            return roleOption;
                        },
                    }, ])
                    .then(function (roleChoice) {
                        const role = roleChoice.role;
                        console.log(roleChoice.role);
                        db.query(
                            "SELECT * FROM emp_role WHERE title = ?",
                            [role],
                            function (err, res) {
                                if (err) throw err;
                                let roleId = res[0].id;
                                let query = "UPDATE employee SET role_id = ? WHERE last_name =?";
                                let values = [roleId, name];
                                console.log(values);
                                db.query(query, values);
                                employeesView();
                            }
                        );
                    });
            });
        });
    });
}