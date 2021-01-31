const connection = require("../connection.js");

class Database {
    constructor(connection) {
        this.connection= connection;
    }

    allEmployees() {
        return this.connection.promise().query 
        (
            "SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department on role.dept_id = department.id"
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

module.exports= new Database(connection)

//12.4.3 for inspiration