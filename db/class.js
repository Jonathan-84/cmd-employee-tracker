const connection = require("../connection.js");

class Database {
    constructor(connection) {
        this.connection= connection;
    }

    allEmployees() {
        return this.connection.promise().query (
            "SELECT * FROM employee"
        )
    }
    ByDept() {
        return this.connection.promise().query (
            "SELECT * FROM department"
        )
    }
    ByRole() {
        return this.connection.promise().query (
            "SELECT * FROM role"
        )
    }
    addEmployee() {
        return this.connection.promise().query (
            "SELECT * FROM employee"
        )
    }



}

//12.4.3 for inspiration