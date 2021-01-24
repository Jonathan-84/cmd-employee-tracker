const mysql = require("mysql2");
const inquirer = require("inquirer");
const cTable = require("console.table");
const connection = require("./connection.js");

//const express = require('express');

Init() {
    inquirer.prompt([{
        type: "list",
        name: "action",
        message: "What would you like to do? (Use arrow keys)",
        choices: 
        [
            "View All Employees", 
            new inquirer.Separator(),
            "View All Employees By Department",
            new inquirer.Separator(),
            "View All Employees By Role", 
            new inquirer.Separator(),
            "Add Employee", 
            new inquirer.Separator(),
            "Remove Employee",
            new inquirer.Separator(),
            "Update Employee Role", 
            new inquirer.Separator(),
            "Update Employee Manager",
            new inquirer.Separator(),
            "Exit"
        ],
    }, 
])
    .then(function(answer){
        switch (answer.action) {
            case "View All Employees":
                allEmployees();                 
                break;
            case "View All Employees By Department":
                ByDept();
                break;
            case "View All Employees By Role":
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