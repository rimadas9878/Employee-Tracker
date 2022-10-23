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

//Code to display Department Table
const departmentTableDisplay = () =>{
    console.log("Displaying table content of Department")
    const sql = `SELECT * FROM department`;
    db.query( sql, (err,result) => {    
        if (err) {
            console.log(err)
          }
        else{
            console.table(result);
            choices();
        }               
    })
}

//Code to display role Table
const roleTableDisplay = () =>{
    console.log("Displaying table content of role")
    const sql = `SELECT * FROM role`;
    db.query(sql, (err,result) => {  
        if (err) {
            console.log(err)
          }
          else{
            console.table(result);
            choices();
          }              
        
    })
}

//Code to display employee Table
const employeeTableDisplay = () => {
    console.log("Displaying table content of Employee")
    const sql = `SELECT * FROM employee`
    db.query(sql,(err,result) => {  
        if (err) {
            console.log(err)
          }   
        else{
            console.table(result);
            choices();
        }                   
    })
}


//Code to add a new department
const addNewDepartmentName = () => {
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
    ]).then(answer => {
        const sql = `INSERT INTO department(name)
                     VALUE (?)`;
        
        db.query(sql, answer.name_Of_Department, (err,result) => {
            if (err) {
                console.log(err)
            }
            else{
                console.log('Suceessfully Added "' + answer.name_Of_Department + '" department to the database')
                choices();
            }

        })
    })
}

//Code to add a new role
const addNewRole = () => {
    const departmentData = [];
    const sql = `SELECT id, name FROM department`;
    db.query(sql, (err, result) => {
        if (err) {
            console.log(err);
          }
        else{
            result.forEach(department =>{
                let departmentOutput = {
                    name: department.name,
                    id: department.id
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

                const addedRole = 

                db.query(sql,[[roleAnswer.employee_Role, roleAnswer.employee_Salary, roleAnswer.department.id]], (err, result) => {
                    if (err){
                        console.log(err)
                    }
                    else{
                        console.log('Successfully added "' + roleAnswer.employee_Role + '" role to the database');
                        choices();
                    }
                } )
            })
        }
    })

};
        


//Code to add an employee
const employee = () => {
    const outputForRole = [];
    const roleDatabaseOutput = `SELECT * FROM role`;

    db.query(roleDatabaseOutput, (err,result) =>{
        if (err) {
            console.log(err);
          }
        else{
            result.forEach(role => {
                let roleOutput = {
                    id: role.id,
                    titleRole: role.titleRole,
                }
                outputForRole.push(roleOutput);
            })
        }
    })

    const managerRole = [];
    const outputFromEmployeeTable = `SELECT * FROM employee`;

    db.query(outputFromEmployeeTable, (err,result) =>{
        if (err) {
            console.log(err);
          }
        else{
            result.forEach(employee => {
                let managerOutput = {
                    id: employee.id,
                    first_name: employee.first_name,
                    last_name: employee.last_name
                }
                managerRole.push(managerOutput);
            })
        }
    })

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
        const sql = `INSERT INTO employee(first_name, last_name, role_id, manager_id)`

        db.query(sql, [[answer.employee_First_Name, answer.employee_Last_Name, answer.employee_Role, answer.employee_Manager]], (err,result) => {
            if (err){
                console.log(err)
            }
            else{
                
                console.log('Successfully added "' + answer.first_name + '" to the employee database');
                choices();
            }
        });

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
                else if(DepartmentID < 0){
                    return 'Please enter a valid department id'
                }
                return true
            }
        }
    ]).then(answer => {
        const sql = `DELETE FROM department WHERE id = ?`;
        db.query(sql,answer.department_id, (err,result) => {    
            if (err) {
                console.log(err)
              }
            else{
                console.log('Record "'+ answer.department_id +'" has been deleted');
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
    ]).then(({optionsForUser}) => {       
        if(optionsForUser === 'View All Departments'){
            departmentTableDisplay();
        }
        else if (optionsForUser === 'View All Roles'){
            roleTableDisplay();
        }
        else if (optionsForUser === 'View All Employees'){
            employeeTableDisplay();
        }
        else if (optionsForUser === 'Add a Department'){
            addNewDepartmentName();

        }
        else if (optionsForUser === 'Add a Role'){
            addNewRole();
        }
        else if (optionsForUser === 'Add an Employee'){
            employee();
        }
        else if (optionsForUser === 'Update an Employee Role'){

        }
        else if(optionsForUser === 'Delete departments'){
            deleteDepartment();
        }

        else if (optionsForUser === 'Quit'){
            return false;
        }
        
    })
}

choices();