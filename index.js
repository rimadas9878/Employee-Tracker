//Adding the inquirer package to view the questions in command-line
const inquirer = require('inquirer');

//Express package makes working with API easy
const express =  require('express');
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//for .env file to work
require('dotenv').config()

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


function questions() {
    inquirer.prompt([
        {
            type: 'list',
            name: 'optionsForUser',
            message: 'Which option would you like to select?',
            choices: ['View All Departments', 'View All Roles', 'View All Employees', 'Add a Department', 'Add a Role', 'Add an Employee', 'Update an Employee Role', 'Quit'],
        }
    ]).then(({options}) => {
        if(options === 'View All Departments'){
            return `SELECT * FROM department;`
        }
        else if (options === 'View All Roles'){
            return 'SELECT * FROM role;'
        }
        else if (options === 'View All Employees'){
            return 'SELECT * FROM employee;'
        }
    })

}

questions();