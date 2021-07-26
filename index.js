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
            "Update An Employee Role"
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

        }
    });
};