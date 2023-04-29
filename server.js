// Dependencies
const express = require('express');
const inquirer = require('inquirer');
const mysql = require('mysql2');
const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Connect to database
const db = mysql.createConnection(
  {
    host: 'localhost',
    user: 'root',
    password: 'hypnotize1',
    databse: 'employees_db'
  },
  console.log('Connected to the employees_db database.')
);

// Prompt user to select desired action
function init () {
  inquirer
    .prompt({
      type: 'list',
      name: 'choices',
      message: 'Please select from the following options:',
      choices: [
        'View all departments',
        'View all roles',
        'View all employees',
        'Add a department',
        'Add a role',
        'Add an employee',
        'Update an employee',
        'No action'
      ],
    })
    .then((answer) => {
      switch (answer.choices) {
        case 'View all departments':
          viewDepartment()
          break;

        case 'View all roles':
          viewRole()
          break;

        case 'View all employees':
          viewEmployee()
          break;

        case 'Add a department':
          addDepartment()
          break;

        case 'Add a role':
          addRole()
          break;

        case 'Add an employee':
          addEmployee()
          break;

        case 'Update an employee':
          updateEmployee()
          break;

        case 'No action':
          db.end()
          break;
      }
    })
};

// Function to view all departments
function viewDepartment() {
  connection.query('SELECT * FROM department', (err, res) => {
    if (err) throw err;
    console.table(res);
    start();
  });
}

// Function to view all roles
function viewRole() {
  connection.query('SELECT * FROM role', (err, res) => {
    if (err) throw err;
    console.table(res);
    start();
  });
}

// Function to view all employees
function viewEmployee() {
  connection.query('SELECT * FROM employee', (err, res) => {
    if (err) throw err;
    console.table(res);
    start();
  });
}

// Prompt user to add a department to db
function addDepartment() {
  inquirer
    .prompt({
      name: 'name',
      type: 'input',
      message: 'What is the name of the department?'
    })
    .then((answer) => {
      connection.query(
        'INSERT INTO department SET ?',
        {
          name: answer.name
        },
        (err) => {
          if (err) throw err;
          console.log('Department successfully added!');
          start();
        }
      );
    });
}

// Prompt user to add a role to db
function addRole() {
  connection.query('SELECT * FROM department', (err, results) => {
    if (err) throw err;
    inquirer
      .prompt([
        {
          name: 'title',
          type: 'input',
          message: 'What is the title of the role?'
        },
        {
          name: 'salary',
          type: 'input',
          message: 'What is the salary of the role?'
        },
        {
          name: 'department',
          type: 'input',
          message: 'Which department does the role belong to?',
          choices: results.map((department) => {
            return {
              name: department.name,
              value: department.id
            };
          })
        }
      ])
      .then((answer) => {
        connection.query(
          'INSERT INTO role SET ?',
          {
            title: answer.title,
            salary: answer.salary,
            department_id: answer.department
          },
          (err) => {
            if (err) throw err;
            console.log('Role added successfully!');
            start();
          }
        );
      });
  });
}

// Prompt user to add an employee to db
function addEmployee() {
  connection.query('SELECT * FROM role', (err, results) => {
    if (err) throw err;
  })
}

// Default response for any other request (Not Found)
app.use((req, res) => {
  res.status(404).end()
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
});

init();
