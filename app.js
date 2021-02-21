const mysql = require("mysql2");
const inquirer = require("inquirer");
require("console.table");
const connection = require("./connection.js");
const Database = require ("./db/class");

//const express = require('express');

function init() {
    inquirer.prompt([{
        type: "list",
        name: "action",
        message: "What would you like to do? (Use arrow keys)",
        choices: 
        [
            "View All Employees", 
            new inquirer.Separator(),
            "View All Departments",
            new inquirer.Separator(),
            "View All Roles", 
            new inquirer.Separator(),
            "Add Employee", 
            new inquirer.Separator(),
            "Add Department", 
            new inquirer.Separator(),
            "Add Role", 
            new inquirer.Separator(),
         //   "Remove Employee",
         //   new inquirer.Separator(),
           "Update Employee Role", 
            new inquirer.Separator(),
            // "Update Employee Manager",
            // new inquirer.Separator(),
            "Exit"
        ],
    } 
])
    .then(function(answer){
        switch (answer.action) {
            case "View All Employees":
                viewEmployees();                 
                break;
            case "View All Departments":
                viewDepts();
                break;
            case "View All Roles":
                viewRoles();
                break;
            case "Add Employee":
                addEmployee();
                break;
                case "Add Department":
                  addDepartment();
                  break;
                  case "Add Role":
                    addRole();
                    break;
          /* case "Remove Employee":
                removeEmployee();
                break;*/
           case "Update Employee Role":
                updateRole();
                break;
         /* case "Update Employee Manager":
              updateManager();
              break;*/
            case "Exit":
                connection.end();
                break;

        }
    });

}
init()

function viewEmployees() {
    Database.allEmployees().then(([data])=>{
let employees = data;
console.table(employees)
    })
    init()
}

function viewDepts() {
    Database.allDepartments().then(([data])=> {
  let departments = data;      
      console.table(departments);
  //    beginPrompts();

    })
    init()
  };

  function viewRoles() {
    Database.allRoles().then(([data])=> {
  let roles = data;      
      console.table(roles);

    })
    init()
  };


  ///need to fix--- the view function works fine
 
  function addEmployee() {
  //  console.log("Inserting a new employee.\n");
    inquirer 
      .prompt ([ 
        {
          type: "input",
          message: "Please enter the employee's first name:",
          name: "first_name"
        },
        {
          type: "input",
          message: "Please enter the employee's last name:",
          name: "last_name"
        },
        /*{
          type: "input",
          message: "Please enter the employee's role ID number:",
          name: "newRoleId"
        },
        {
          type: "input",
          message: "Please enter the manager's ID number:",
          name: "newManagerId"
        }*/
      ])
      .then (answer => {
        const firstName=answer.first_name
        const lastName= answer.last_name
        Database.allRoles().then (([data])=> {
          let roles = data
          const choices= roles.map (({id, title}) => ({
            name: title,
            value: id
          }));
          inquirer
          .prompt ({
type: "list",
message: "What is the employee's role?",
name: "roleId",
choices: choices
          }) 
          .then (data => {
            let roleId=data.roleId
            Database.allEmployees().then (([data])=>{
              let employees = data
              const managerChoices= employees.map (({id, first_name, last_name})=> ({
                name: `${first_name} ${last_name}`,
                value: id
              }))
              managerChoices.unshift({name:"None", value:null})
              inquirer
              .prompt ({
    type: "list",
    message: "Who is the employee's manager?",
    name: "managerId",
    choices: managerChoices
              }) 
.then (res=>{
  let newEmployee={
    manager_id: res.managerId,
    role_id: roleId,
    first_name: firstName,
    last_name: lastName
  }
  Database.newEmployee(newEmployee)
}).then (()=> console.log(`Added ${firstName} ${lastName}`))
.then (()=> init())
            })
          })
        })
      }
      )}
///////////// need to do, then add role, then delete employee
      function addDepartment() {
          inquirer 
            .prompt ([ 
              {
                type: "input",
                message: "What is the name of the Department that you'd like to add?",
                name: "name"
              },
            ])
            .then (answer => {
              const departmentName=answer
              Database.newDepartment(departmentName).then (()=> { 
                console.log(`Added ${departmentName}`)
                init()
              })
            
            });
          }

          function addRole() {
            Database.allDepartments()
            .then(([data])=> {
              let departments= data
              const departmentChoices= departments.map(({ id, name })=>({
                name: name,
                value: id
              }))

              inquirer 
              .prompt ([ 
                {
                  type: "input",
                  message: "What is the name of the Role?",
                  name: "title"
                },
                {
                  type: "input",
                  message: "What is the salary of the Role?",
                  name: "salary"
                },
                {
                  type: "list",
                  message: "What Department is this Role in?",
                  name: "dept_id",
                  choices:departmentChoices
                },
              ])
              .then(data=>{
                Database.newRole(data)
                init()
              })
            })
        
            }
            function updateRole() {
              Database.allEmployees()
              .then(([data])=>{
                let employees= data
                const employeeChoices= employees.map(({ id, first_name, last_name })=>({
                  name: `${first_name} ${last_name}`,
                  value: id
                }))
                inquirer 
                .prompt ([ 
                  {
                    type: "list",
                    message: "Which employee's role do you wan to update?",
                    name: "employeeId",
                    choices: employeeChoices
                  },
                ])
                .then(data =>{
                let empId= data.employeeId
                Database.allRoles()
                .then(([data])=>{
                  let roles= data
                  const roleChoices= roles.map(({ id, title })=>({
                    name: title ,
                    value: id
                  }))
                  inquirer 
                  .prompt ([ 
                    {
                      type: "list",
                      message: "Which role do you want to assign the employee?",
                      name: "roleId",
                      choices: roleChoices
                    },
                  ])
                  .then(data=> Database.updateEmployeeRole(empId, data.roleId))
                  .then(()=> init())

                })
                })
              })
            }