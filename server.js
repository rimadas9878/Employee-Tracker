//for .env file to work
require('dotenv').config()

//Adding the inquirer package to view the questions in command-line
const inquirer = require('inquirer');

//Express package makes working with API easy
const express = require('express');
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//Adding the PORT
const PORT = process.env.PORT || 3001;

//Listening to PORT 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

//Import and require mysql2
const mysql = require('mysql2');


//Database connection, adding the parameters from .env file
const db = mysql.createConnection({
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
},
    console.log("Connected to employee_db database")
);

//Code to display data from "Department" Table
const departmentTableDisplay = () => {
    console.log("Displaying data from 'Department' table")
    const sql = `SELECT * FROM department`;
    db.query(sql, (err, result) => {
        if (err) {
            console.log(err)
        }
        else {
            console.table(result);
            choices();
        }
    })
}

//Code to display data from "Role" Table
const roleTableDisplay = () => {
    console.log("Displaying data from 'role' table")
    const sql = `SELECT * FROM role`;
    db.query(sql, (err, result) => {
        if (err) {
            console.log(err)
        }
        else {
            console.table(result);
            choices();
        }

    })
}

//Code to display data from Employee Table
const employeeTableDisplay = () => {
    console.log("Displaying data from 'Employee' table")
    const sql = `SELECT * FROM employee`
    db.query(sql, (err, result) => {
        if (err) {
            console.log(err)
        }
        else {
            console.table(result);
            choices();
        }
    })
}


//Code to add a new department in the table
const addNewDepartmentName = () => {
    inquirer.prompt([
        {
            type: 'input',
            name: 'name_Of_Department',
            message: 'What is the name of the department?',
            validate: (nameOfDepartment) => {
                if (nameOfDepartment === '') {
                    return 'Department name cannot be left blank'
                }
                return true
            }
        }
    ]).then(answer => {
        const sql = `INSERT INTO department(name)
                     VALUE (?)`;

        db.query(sql, answer.name_Of_Department, (err, result) => {
            if (err) {
                console.log(err)
            }
            else {
                console.log('Suceessfully Added "' + answer.name_Of_Department + '" department to the database')
                choices();
            }

        })
    })
}

//Code to add a new role in the table
const addNewRole = () => {
    const departmentData = [];
    const sql = `SELECT id, name FROM department`;
    db.query(sql, (err, result) => {
        if (err) {
            console.log(err);
        }
        else {
            result.forEach(department => {
                let departmentOutput = {
                    name: department.name,
                    value: department.id
                }
                departmentData.push(departmentOutput);
            });

            inquirer.prompt([
                {
                    type: 'input',
                    name: 'employee_Role',
                    message: 'Enter the employee role in the organization',
                    validate: (employeeRole) => {
                        if (employeeRole === '') {
                            return 'Employee role cannot be blank'
                        }
                        return true
                    }
                },
                {
                    type: 'input',
                    name: 'employee_Salary',
                    message: 'Enter the employee salary',
                    validate: (employeeSalary) => {
                        if (employeeSalary === '') {
                            return 'Employee salary field cannot be blank'
                        }
                        return true
                    }
                },
                {
                    type: 'list',
                    name: 'department',
                    message: 'Select the employee department',
                    choices: departmentData
                }
            ]).then(roleAnswer => {
                const sql = `INSERT INTO role (titleRole, salary_in_thousand, department_id)
                             VALUES (?)`

                db.query(sql, [[roleAnswer.employee_Role, roleAnswer.employee_Salary, roleAnswer.department]], (err, result) => {

                    if (err) {
                        console.log(err)
                    }
                    else {
                        console.log('Successfully added "' + roleAnswer.employee_Role + '" role to the database');
                        choices();
                    }
                })
            })
        }
    })

};



//Code to add an employee
const employee = () => {
    const outputForRole = [];
    const roleDatabaseOutput = `SELECT * FROM role`;

    db.query(roleDatabaseOutput, (err, result) => {
        if (err) {
            console.log(err);
        }
        else {
            result.forEach(role => {
                let roleOutput = {
                    name: role.titleRole,
                    value: role.id
                }
                outputForRole.push(roleOutput);
            })
            const managerRole = [];
            const outputFromEmployeeTable = `SELECT * FROM employee`;

            db.query(outputFromEmployeeTable, (err, result) => {
                if (err) {
                    console.log(err);
                }
                else {
                    result.forEach(employee => {
                        let managerOutput = {
                            name: employee.first_name + " " + employee.last_name,
                            value: employee.id,
                        }
                        managerRole.push(managerOutput);
                    })
                    console.log(managerRole);
                    inquirer.prompt([
                        {
                            type: 'input',
                            name: 'employee_First_Name',
                            message: 'Enter the first name of the employee',
                            validate: (employeeFirstName) => {
                                if (employeeFirstName === '') {
                                    return 'Please enter the first name of the employee'
                                }
                                return true
                            }
                        },
                        {
                            type: 'input',
                            name: 'employee_Last_Name',
                            message: 'Enter the last name of the employee',
                            validate: (employeeLastName) => {
                                if (employeeLastName === '') {
                                    return 'Please enter the last name of the employee'
                                }
                                return true
                            }
                        },
                        {
                            type: 'list',
                            name: 'employee_Role',
                            message: 'Select the employee role',
                            choices: outputForRole
                        },
                        {
                            type: 'list',
                            name: 'employee_Manager',
                            message: 'Select the Manager of the added employee',
                            choices: managerRole
                        }
                    ]).then(answer => {
                        const sql = `INSERT INTO employee(first_name, last_name, role_id, manager_id)
                                     VALUE(?)`;

                        db.query(sql, [[answer.employee_First_Name, answer.employee_Last_Name, answer.employee_Role, answer.employee_Manager]], (err, result) => {
                            if (err) {
                                console.log(err)
                            }
                            else {

                                console.log('Successfully added a new Employee to the database');
                                choices();
                            }
                        });

                    })
                }


            })
        }
    })
}

//Code to Update an Employee Role
const updateEmployeeRole = () => {

    inquirer.prompt([
        {
            type: 'input',
            name: 'role_id',
            message: "Enter the Role ID",
            validate: (updateRoleIdOfTheEmp) => {
                if (updateRoleIdOfTheEmp === '') {
                    return 'What will be the new role id of the employee'
                }
                return true
            }
        },
        {
            type: 'input',
            name: 'first_name',
            message: 'What is the name of the employee whose role needs to be updated?',
            validate: (empNameForRoleUpdation) => {
                if (empNameForRoleUpdation === '') {
                    return 'Please enter a role id'
                }
                return true
            }
        }       
    ])
        .then(answer => {
            console.log(answer);
            const sql = `UPDATE employee SET role_id = ? WHERE first_name = ?`;


            db.query(sql, [[answer.role_id], [answer.first_name]], (err, result) => {
                if (err) {
                    console.log(err)
                } else {
                    console.log(answer.first_name +"'s roll id has been updated to " + answer.role_id);
                    choices();
                }

            })
        })
}


//Code to Update an Manager 
const updatemanager = () => {

    inquirer.prompt([
        {
            type: 'input',
            name: 'manager_id',
            message: "Enter the Manager ID",
            validate: (updateManger) => {
                if (updateManger === '') {
                    return 'What is the ID of the new manager?'
                }
                return true
            }
        },
        {
            type: 'input',
            name: 'first_name',
            message: 'What is the name of the employee whose manager needs to be updated?',
            validate: (empNameForManagerUpdation) => {
                if (empNameForManagerUpdation === '') {
                    return 'Please enter a the first name'
                }
                return true
            }
        }       
    ])
        .then(answer => {
            console.log(answer);
            const sql = `UPDATE employee SET manager_id = ? WHERE first_name = ?`;

            db.query(sql, [[answer.manager_id], [answer.first_name]], (err, result) => {
                if (err) {
                    console.log(err)
                } else {
                    console.log(answer.first_name +"'s new manager's id is " + answer.manager_id);
                    choices();
                }

            })
        })
}

//Code for OrderBy Manager
const orderByManager = () => {
    const sql = `SELECT * FROM employee ORDER BY manager_id asc`;

    db.query(sql, (err,result) => {
        if(err){
            console.log(err);
        }
        else{
            console.table(result);
            choices();
        }
        
    })
}

//Code for OrderBy Department
const orderByDepartment = () => {
    const sql = `SELECT * FROM role ORDER BY department_id desc`;

    db.query(sql, (err,result) => {
        if(err){
            console.log(err);
        }
        else{
            console.table(result);
            choices();
        }
        
    })
}

//Adding code to delete department
const deleteDepartment = () => {

    inquirer.prompt([
        {
            type: 'input',
            name: 'department_id',
            message: 'Enter the department id which needs to be deleted',
            validate: (DepartmentID) => {
                if (DepartmentID === '') {
                    return 'Please enter a department id'
                }
                else if (DepartmentID < 0) {
                    return 'Please enter a valid department id'
                }
                return true
            }
        }
    ]).then(answer => {
        const sql = `DELETE FROM department WHERE id = ?`;
        db.query(sql, answer.department_id, (err, result) => {
            if (err) {
                console.log(err)
            }
            else {
                console.log('Record "' + answer.department_id + '" has been deleted');
                choices();
            }
        })

    })
}

//Adding code to delete role
const deleteRole = () => {

    inquirer.prompt([
        {
            type: 'input',
            name: 'role_id',
            message: 'Select the role id that needs to be deleted',
            validate: (roleId) => {
                if (roleId === '') {
                    return 'Please enter a role name'
                }
                else if (roleId < 0) {
                    return 'Please enter a valid role id'
                }
                return true
            }
        }
    ]).then(answer => {
        const sql = `DELETE FROM role WHERE id = ?`;

        db.query(sql, answer.role_id, (err, result) => {
            if (err) {
                console.log(err);
            }
            else {
                console.log('Record "' + answer.role_id + '" has been deleted');
                choices();
            }
        })
    })
}

//Adding code to delete employee
const deleteEmployee = () => {

    inquirer.prompt([
        {
            type: 'input',
            name: 'employee_Name',
            message: 'Select the employee that needs to be deleted',
            validate: (employeeName) => {
                if (employeeName === '') {
                    return 'Please enter a employee name'
                }
                return true
            }
        }
    ]).then(answer => {
        
        const sql = `DELETE FROM employee WHERE first_name = ?`;

        db.query(sql, answer.employee_Name, (err, result) => {
            if (err) {
                console.log(err);
            }
            else {
                console.log('Record "' + answer.employee_Name + '" has been deleted');
                choices();
            }
        })
    })
}

//Code for total budget of all the employess in a departmant
const totalBudget = () => {
    inquirer.prompt([
        {
            type: 'input',
            name: 'department.id',
            message: 'What is the ID of the department to know that total budget',
            validate: (deptId) => {
                if (deptId === '') {
                    return 'Please enter the department Id'
                }
                return true
            }
        }
    ]).then(answer => {

            const sql = `SELECT SUM(salary_in_thousand) as Total FROM role WHERE department_id = ?`;

            db.query(sql, answer.department.id, (err,result) => {
                if(err){
                    console.log(err);
                }
                else{
                    console.log(result);
                    choices();
                }
            })
        })
}


const choices = () => {
    inquirer.prompt([
        {
            type: 'list',
            name: 'optionsForUser',
            message: 'Which option would you like to select?',
            choices: ['View All Departments',
                'View All Roles',
                'View All Employees',
                'Add a Department',
                'Add a Role',
                'Add an Employee',
                'Update an Employee Role',
                'Update an Employee Manager',
                'View employees by manager',
                'View employees by department',
                'Delete departments',
                'Delete role',
                'Delete employee',
                'View Combined salaries of all employees',
                'Quit'],
        }
    ]).then(({ optionsForUser }) => {
        if (optionsForUser === 'View All Departments') {
            departmentTableDisplay();
        }
        else if (optionsForUser === 'View All Roles') {
            roleTableDisplay();
        }
        else if (optionsForUser === 'View All Employees') {
            employeeTableDisplay();
        }
        else if (optionsForUser === 'Add a Department') {
            addNewDepartmentName();
        }
        else if (optionsForUser === 'Add a Role') {
            addNewRole();
        }
        else if (optionsForUser === 'Add an Employee') {
            employee();
        }
        else if (optionsForUser === 'Update an Employee Role') {
            updateEmployeeRole();
        }
        else if (optionsForUser === 'Update an Employee Manager') {
            updatemanager();
        }
        else if (optionsForUser === 'View employees by manager') {
            orderByManager();
        }       
        else if (optionsForUser === 'View employees by department') {
            orderByDepartment();
        }
        else if (optionsForUser === 'Delete departments') {
            deleteDepartment();
        }
        else if (optionsForUser === 'Delete role') {
            deleteRole();
        }
        else if (optionsForUser === 'Delete employee') {
            deleteEmployee();
        }
        else if (optionsForUser === 'View Combined salaries of all employees') {
            totalBudget();
        }
        else if (optionsForUser === 'Quit') {
            process.exit();
        }

    })
}

choices();