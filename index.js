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

db.connect(function(err) {
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
    .then (function(answer) {
        switch (answer.options){
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

// View All Employees

function employeesView() {
    db.query(
        "SELECT employee.id, employee.first_name, employee.last_name, emp_role.title, department.d_name AS department, emp_role.salary, CONCAT(manager.first_name), '', manager.last_name AS manager FROM employee LEFT JOIN emp_role on employee.role_id = emp_role_id LEFT JOIN department on emp_role.department_id = department.id LEFT JOIN employee manager on manager.manager_id = employee.manager_id;",
        function(err, res) {
            if (err) throw err;
            console.table(res);
            begin()
        }
    )
}