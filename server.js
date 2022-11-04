// Require dependencies
const inquirer = require('inquirer');
const express = require('express');
const mysql = require('mysql2');
const sequelize = require('./config/connection');
const questions = require('./src/questions');
const cTable = require('console.table');

app = express();

// define port for server to open on
const PORT = process.env.PORT || 3001;

// Middleware for Express:
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// -----inquirer prompts------- //
// Give the user options to choose what they would like to do
const userOptions = new questions('list', 'userOptions', 'What would you like to do?', ['View All Departments', 'View All Roles', 'View All Employees', 'Add A Department', 'Add A Role', 'Add An Employee', 'Update an Employee Role'])

// ---------inquirer functions---------- //
function init() { options() };

async function options() {
  const getOptions = await inquirer.prompt([userOptions]);
  switch (getOptions.userOptions) {
    case 'View All Departments':
      // display cTable for departments
      viewDepartments();
      break;

    case 'View All Roles':
      // display cTable for roles
      viewRoles();
      break;

    case 'View All Employees':
      // display cTable for employees
      viewEmployees();
      break;

    case 'Add A Department':
      // prompt user to add a dept then display departments
      addDepartment();
      break;

    case 'Add A Role':
      // prompt user to add a role then display roles
      addRole();
      break;

    case 'Add An Employee':
      // prompt user to add an employee then display list of employees
      addEmployee();
      break;

    case 'Update An Employee Role':
      // prompt user to select and employee from existing list and then enter a value in for Employee Role, and then display list of employee's and their roles
      updateEmployee();
      break;

      default:
        console.log('I am sorry! It looks like we have encountered an Error.');
  }
}
// set app to run locally // connect to db
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening'));
});

// init app
init();