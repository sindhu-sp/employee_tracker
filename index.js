const mysql = require("mysql2");
const inquirer = require("inquirer");
let departments;

//Connect to database
const db = mysql.createConnection({
        host: 'localhost',
        port: 3306,
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
    db.query("SELECT * FROM emp_role", function (err, res) {
        if (err) throw err;
        console.table(res);
        begin();
    })
};

// View All Employees

function employeesView() {
    db.query(

        "SELECT id, CONCAT(first_name, ' ', last_name) AS employee_name FROM employee",
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
        .then(function (answer) {
            console.log(answer.department);
            db.query("INSERT INTO department SET ?", {
                    d_name: answer.department,
                },
                function (err, res) {
                    if (err) throw err;
                    console.table(res);
                    begin();
                });
        });
};
/////
/////
//  Add A Role

function roleAdd() {
    db.query('SELECT * FROM department', function (err, res) {
        if (err) throw err;
        var question = [{
                name: "deptName",
                type: "list",
                message: "Which department the new role to be added?:  ",
                choices: function () {
                    var deptChoice = [];
                    res.forEach(res => {
                        deptChoice.push(
                            res.d_name
                        );
                    })
                    return deptChoice;
                }

            },

            {
                name: "title",
                type: "input",
                message: "Employee's Role: "
            },

            {
                name: "salary",
                type: "input",
                message: "Salary of the Role: "
            }
        ];

        inquirer.prompt(question).then(function (answer) {
            const department = answer.deptName;

            db.query('SELECT * FROM department', function (err, res) {
                if (err) throw err;
                let dept = res.filter(function (res) {
                    return res.d_name == department;
                })
                let id = dept[0].id;
                let query = "INSERT INTO emp_role (title, salary, department_id) VALUES (?, ?, ?)";
                let values = [answer.title, parseInt(answer.salary), id]
                console.log(values);
                db.query(query, values);
                rolesView();
            })
        });
    });
};



////////////
////////////
// Add An Employee

function employeeAdd() {

    var question = [{
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

    inquirer.prompt(question).then(function (answer) {
        db.query(
            "INSERT INTO employee SET ?", {
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

// function roleAdd() {

//     var question = [
//         {
//             name: "title",
//             type: "input",
//             message: "Employee's Role: "
//         },
//         {
//             name: "deptId",
//             type: "input",
//             message: "Which department the new role to be added?:  "

//         },
//         {
//             name: "salary",
//             type: "list",
//             message: "Salary of the Role: "
//         }
//     ];

//     inquirer.prompt(question).then(function(answer) {
//         db.query(
//             "INSERT INTO emp_role SET ?", 
//             {
//                 title: answer.title,
//                 department_id: answer.deptId,
//                 salary: answer.salary
//             },
//             function (err, res) {
//                 if (err) throw err;
//                 begin();
//             }
//         );
//     });
// };