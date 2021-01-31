const mysql = require("mysql2");
const util = require('util');

const begin = require("./app.js");

// Double check my info
const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "mulderscully28",
    database: "employeeDB"
});

connection.connect();
//connection.query = util.promisify(connection.query);

module.exports = connection;