const mysql = require("mysql2");
const inquirer = require("inquirer");

//Connect to database
const db = mysql.createConnection({
        host: 'localhost',
        port: 3301,
        user: 'root',
        password: 'password',
        database: 'employee_db'
    },
    console.log('Connected to the employee_db database')
);

db.connect(function (err) {
    if (err) throw err;
    begin();
});

// class Database {
//     constructor( config ) {
//         this.connection = mysql.createConnection( config );
//     }
//     query( sql, args ) {
//         return new Promise( ( begin, reject ) => {
//             this.connection.query( sql, args, ( err, rows ) => {
//                 if ( err )
//                     return reject( err );
//                 begin( rows );
//             } );
//         } );
//     }
//     close() {
//         return new Promise( ( begin, reject ) => {
//             this.connection.end( err => {
//                 if ( err )
//                     return reject( err );
//                 begin();
//             } );
//         } );
//     }
// }

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
                "Exit"
            ]

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
};


// View All Department

function departmentView() {
    db.query("SELECT * FROM department", function (err, res) {
        if (err) throw err;
        console.table(res);
        begin();
    })
};

// View All Roles

function rolesView() {
    db.query("SELECT * FROM role", function (err, res) {
        if (err) throw err;
        console.table(res);
        begin();
    })
};

// View All Employees

function employeesView() {
    db.query(
        "SELECT employee.id, employee.first_name, employee.last_name, emp_role.title, department.d_name AS department, emp_role.salary, CONCAT(manager.first_name), '', manager.last_name AS manager FROM employee LEFT JOIN emp_role on employee.role_id = emp_role_id LEFT JOIN department on emp_role.department_id = department.id LEFT JOIN employee manager on manager.manager_id = employee.manager_id;",
        function (err, res) {
            if (err) throw err;
            console.table(res);
            begin();
        }
    )
}

// Add A Department

function departmentAdd() {
    inquirer.prompt({
        name: "department",
        type: "input",
        message: "Name of the new Department"
    })
    .then(function(answer) {
        console.log(answer.department);
        db.query("INSERT INTO department SET ?",
        {
            name: answer.department,
        },
        function (err, res) {
        if (err) throw err;
        console.table(res);
        begin();
        });
    });
};

//  Add A Role

function roleAdd() {
    var question = [
        {
            name: "title",
            type: "input",
            message: "Employee's Role: "
        },
        {
            name: "deptId",
            type: "input",
            message: "Which department the new role to be added: "
        },
        {
            name: "salary",
            type: "list",
            message: "Salary of the Role: "
        }
    ];

    inquirer.prompt(question).then(function(answer) {
        db.query(
            "INSERT INTO role SET ?", 
            {
                title: answer.title,
                department_id: answer.id,
                salary: answer.salary
            },
            function (err, res) {
                if (err) throw err;
                begin();
            }
        );
    });
};

// Add An Employee

function employeeAdd() {

    var question = [
        {
            name: "first_name",
            type: "input",
            message: "Employee's First Name: "
        },
        {
            name: "last_name",
            type: "input",
            message: "Employee's Last Name: "
        },
        {
            name: "title",
            type: "input",
            message: "Employee's Role (employee.role_id): "
        },
        {
            name: "managerId",
            type: "input",
            message: "Employee's Manager (employee.id): "
        }
    ];

    inquirer.prompt(question).then(function(answer) {
        db.query(
            "INSERT INTO employee SET ?", 
            {
                first_name: answer.first_name,
                last_name: answer.last_name,
                role_id: answer.title,
                manager_id: answer.managerId
            },
            function (error) {
                if (error) throw error;
                updateManager(answer.title, answer.managerId);
                employeesView();
            }
        )
    });
    
};

// Update An Employee Role

function updateEmployeeRole() {
    var emp = employeesView();
    var empOption = emp.map(index => {
        id: id;
    })
    inquirer.prompt({
        name: "roleId",
        type: "list",
        message: "The role the employee need to be updated: ",
        choices: empOption
    })
    db.query("UPDATE employee SET role_id = ? WHERE emp_id = ?", [roleID, EMPID])
};

function updateManager() {
    db.query("UPDATE employee SET role_id=? WHERE id=?", [roleID, empID])
};