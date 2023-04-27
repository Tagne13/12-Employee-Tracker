/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
// Dependencies
const express = require('express')
const inquirer = require('inquirer')
const mysql = require('mysql2')
const PORT = process.env.PORT || 3001
const app = express()

// Express middleware
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

// Connect to database
const db = mysql.createConnection(
  {
    host: 'localhost',
    user: 'root',
    password: 'hypnotize1',
    databse: 'employees_db'
  },
  console.log('Connected to the employees_db database.')
)

function init () {
  inquirer.prompt([
    {
      type: 'list',
      name: 'choices',
      message: 'Please select from the following options:',
      choices: ['View all departments',
        'View all roles',
        'View all employees',
        'Add a department',
        'Add a role',
        'Add an employee',
        'Update an employee',
        'No action']
    }
  ])
    .then((answers) => {
      switch (answers.choices) {
        case 'View all departments':
          viewDepartment()
          break

        case 'View all roles':
          viewRole()
          break

        case 'View all employees':
          viewEmployee()
          break

        case 'Add a department':
          addDepartment()
          break

        case 'Add a role':
          addRole()
          break

        case 'Add an employee':
          addEmployee()
          break

        case 'Update an employee':
          updateEmployee()
          break

        case 'No action':
          db.end()
          break
      }
    })
}

// Query database

// Default response for any other request (Not Found)
app.use((req, res) => {
  res.status(404).end()
})

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

init()
