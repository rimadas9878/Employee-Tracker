//for .env file to work
require('dotenv').config()

//Adding the inquirer package to view the questions in command-line
const inquirer = require('inquirer');

//Express package makes working with API easy
const express =  require('express');
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

//Questions to add a department
const departmentName = () => {
    inquirer.prompt([
        {
            type: 'input',
            name: 'name_Of_Department',
            message: 'Enter the name of the department',
            validate: (nameOfDepartment) => {
                if (nameOfDepartment === '') {
                    return 'Please enter name of the department'
                }
                return true
            }
        }
    ])
}

//Questions to add a role
const role = () => {
    inquirer.prompt([
        {
            type: 'input',
            name: 'employee_Name',
            message: 'Enter the name of the employee',
            validate: (employeeName) => {
                if (employeeName === '') {
                    return 'Please enter name of the employee'
                }
                return true
            }
        },
        {
            type: 'input',
            name: 'employee_Salary',
            message: 'Enter the salary of the employee',
            validate: (employeeSalary) => {
                if (employeeSalary === '') {
                    return 'Please enter salary of the employee'
                }
                return true
            }
        },
        {
            type: 'input',
            name: 'employee_Department',
            message: 'Enter the department name of the employee',
            validate: (employeeDepartment) => {
                if (employeeDepartment === '') {
                    return 'Please enter department name of the employee'
                }
                return true
            }
        }

    ])
}

////Questions to add an employee
const employee = () => {
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
            type: 'input',
            name: 'employee_Role',
            message: 'Enter the role of the employee',
            validate: (employeeRole) => {
                if (employeeRole === '') {
                    return 'Please enter the role of the employee'
                }
                return true
            }
        },
        {
            type: 'input',
            name: 'manager_Name',
            message: 'Enter the name of the manager',
            validate: (managerName) => {
                if (managerName === '') {
                    return 'Please enter the name of the manager'
                }
                return true
            }
        }
    ])
}

const choices = () => {
    inquirer.prompt([
        {
            type: 'list',
            name: 'optionsForUser',
            message: 'Which option would you like to select?',
            choices: ['View All Departments', 'View All Roles', 'View All Employees', 'Add a Department', 'Add a Role', 'Add an Employee', 'Update an Employee Role', 'Quit'],
        }
    ]).then(({optionsForUser}) => {       
        if(optionsForUser === 'View All Departments'){
            console.log("Displaying table content of Department")
            const sql = `SELECT * FROM department`;
            db.query( sql, (err,result) => {    
                if (err) {
                    res.status(400).json({ error: err.message });
                    return;
                  }
                else{
                    console.table(result);
                    choices();
                }               
            })
        }
        else if (optionsForUser === 'View All Roles'){
            console.log("Displaying table content of role")
            const sql = `SELECT * FROM role`;
            db.query(sql, (err,result) => {  
                if (err) {
                    res.status(400).json({ error: err.message });
                    return;
                  }
                  else{
                    console.table(result);
                    choices();
                  }              
                
            })
        }
        else if (optionsForUser === 'View All Employees'){
            console.log("Displaying table content of Employee")
            const sql = `SELECT * FROM employee`
            db.query(sql,(err,result) => {  
                if (err) {
                    res.status(400).json({ error: err.message });
                    return;
                  }   
                else{
                    console.table(result);
                    choices();
                }                   
            })
        }
        else if (optionsForUser === 'Add a Department'){
            departmentName();

        }
        else if (optionsForUser === 'Add a Role'){
            role();
        }
        else if (optionsForUser === 'Add an Employee'){
            employee();
        }
        else if (optionsForUser === 'Update an Employee Role'){

        }
        else if (optionsForUser === 'Quit'){
            return false;
        }
        
    })
}

choices();
