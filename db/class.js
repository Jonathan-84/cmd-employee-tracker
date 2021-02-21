const connection = require("../connection.js");

class Database {
  constructor(connection) {
    this.connection = connection;
  }

  allEmployees() {
    return this.connection
      .promise()
      .query(
        "SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department on role.dept_id = department.id"
      );
  }
  allDepartments() {
    return this.connection
      .promise()
      .query(
        "SELECT department.id, department.name from department ORDER BY department.id;"
      );
  }

  allRoles() {
    return this.connection
      .promise()
      .query(
        "SELECT role.id, role.title, role.salary, department.name AS department FROM role INNER JOIN department ON role.dept_id = department.id;"
      );
  }

  
  //async explore this as the answer to fix the errrors/ async/await operators
  newEmployee(answer) {
    console.log(answer)
    return this.connection
    .promise()
    .query("INSERT INTO employee SET ?", answer);
  }


  newRole(role) {
    return this.connection
    .promise()
    .query("INSERT INTO role SET ?", role);
  }

  newDepartment(answer) {
    console.log(answer)
    return this.connection
    .promise()
    .query("INSERT INTO department SET ?", answer);
  }

  /*removeEmployee(employeeId) {
    return this.connection.query(
      "DELETE FROM employee WHERE id = ?",
      employeeId
    );
  }*/

  updateEmployeeRole(employeeId, roleId) {
    return this.connection
    .promise()
    .query(
      "UPDATE employee SET role_id = ? WHERE id = ?",
      [roleId, employeeId]
    );
  }
}

module.exports = new Database(connection);

//12.4.3 for inspiration
