const mysql = require("mysql2");
const inquirer = require("inquirer");
require("console.table");
const connection = require("./connection.js");
const Database = require ("./db/class")

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
            "Remove Employee",
            new inquirer.Separator(),
           // "Update Employee Role", 
            // new inquirer.Separator(),
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
                ByDept();
                break;
            case "View All Roles":
                ByRole();
                break;
            case "Add Employee":
                addEmployee();
                break;
            case "Remove Employee":
                removeEmployee();
                break;
            case "Update Employee Role":
                updateRole();
                break;
            case "Update Employee Manager":
                updateManager();
                break;
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
}