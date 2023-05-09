// Dependencies
const inquirer = require('inquirer');
const mysql = require('mysql2');

// Connect to database
const db = mysql.createConnection(
  {
    host: 'localhost',
    user: 'root',
    password: 'hypnotize1',
    database: 'employees_db'
  },
  console.log('Connected to the employees_db database.')
);

// Prompt user to select desired action
function start () {
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
  db.query('SELECT * FROM department', (err, res) => {
    if (err) throw err;
    console.table(res);
    start();
  });
}

// Function to view all roles
function viewRole() {
  db.query('SELECT * FROM role', (err, res) => {
    if (err) throw err;
    console.table(res);
    start();
  });
}

// Function to view all employees
function viewEmployee() {
  db.query('SELECT * FROM employee', (err, res) => {
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
      db.query(
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
  db.query('SELECT * FROM department', (err, results) => {
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
          type: 'list',
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
        db.query(
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
  db.query('SELECT * FROM role', (err, results) => {
    if (err) throw err;
    inquirer
      .prompt([
        {
          name: 'first_name',
          type: 'input',
          message: 'What is the first name of the employee?'
        },
        {
          name: 'last_name',
          type: 'input',
          message: 'What is the last name of the employee?'
        },
        {
          name: 'role',
          type: 'list',
          message: 'What is the role of the employee?',
          choices: results.map((role) => {
            return {
              name: role.title,
              value: role.id
            };
          })
        },
        {
          name: 'manager',
          type: 'list',
          choices: results.map((employee) => {
            return {
              name: employee.first_name,
              name: employee.last_name,
              value: employee.id
            };
          })
        }
      ])
      .then((answer) => {
        db.query(
          'INSERT INTO employee SET ?',
          {
            first_name: answer.first_name,
            last_name: answer.last_name,
            role_id: answer.role,
            manager_id: answer.manager_id
          },
          (err) => {
            if (err) throw err;
            console.log('Employee added successfully!');
            start();
          }
        );
      });
  });
}

// Prompt user to update an employee's role in the db
function updateEmployee() {
  db.query('SELECT * FROM employee', (err, results) => {
    if (err) throw err;
    inquirer
      .prompt([
        {
          name: 'employeeId',
          type: 'input',
          message: 'What is the ID number of the employee?',
        },
        {
          name: 'newRole',
          type: 'list',
          message: 'What is the new role of the employee?',
          choices: results.map((role) => {
            return {
              name: role.title,
              value: role.id
            };
          })
        }
      ])
      .then((answer) => {
        const employeeId = answer.employeeId;
        const newRole = answer.newRole;
        updateEmployeeRole(employeeId, newRole);
      });
  });
}

function updateEmployeeRole(employeeId, newRole) {
  db.query(
    'UPDATE employee SET role = ? WHERE id = ?', 
    [newRole, employeeId],
    (err) => {
      if (err) throw err;
      console.log('Employee updated.');
      start();
    }
  );
}

start()