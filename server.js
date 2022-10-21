const questions = () => {
    inquirer.prompt([
        {
            type: 'List',
            name: 'options',
            message: 'Which option would you like to select',
            choices: ['view all departments', 'view all roles', 'view all employees', 'add a department', 'add a role', 'add an employee', 'update an employee role']
        }
    ])
}

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