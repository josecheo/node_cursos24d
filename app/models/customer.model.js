const sql = require("./db.js");

// constructor
class Customer {
  constructor(customer) {
    this.nombre = customer.nombre;
    this.telefono = customer.telefono;
    this.ciudad = customer.ciudad;
    this.correo = customer.correo;
    this.codigo_promocion = customer.codigo_promocion;
    this.idcurso = customer.idcurso;

  }
  static create(newCustomer, result) {
    console.log("newCustomer",newCustomer)
    sql.query("INSERT INTO customers SET ?", newCustomer, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }

      console.log("created customer: ", { idclients: res.insertId, ...newCustomer });
      result(null, { idclients: res.insertId, ...newCustomer });
    });
  }
  static findById(customerId, result) {
    sql.query(`SELECT * FROM customers WHERE id = ${customerId}`, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }

      if (res.length) {
        console.log("found customer: ", res[0]);
        result(null, res[0]);
        return;
      }

      // not found Customer with the id
      result({ kind: "not_found" }, null);
    });
  }
  static getAll(result) {
    sql.query("SELECT * FROM customers", (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      console.log("customers: ", res);
      result(null, res);
    });
  }
  static updateById(id, customer, result) {
    sql.query(
      "UPDATE customers SET correo = ?, name = ?, active = ? WHERE idclients = ?",
      [customer.correo, customer.name, customer.nombre, customer.ciudad, customer.telefono, id],
      (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(null, err);
          return;
        }

        if (res.affectedRows == 0) {
          // not found Customer with the id
          result({ kind: "not_found" }, null);
          return;
        }

        console.log("updated customer: ", { id: id, ...customer });
        result(null, { id: id, ...customer });
      }
    );
  }
  static remove(id, result) {
    sql.query("DELETE FROM customers WHERE id = ?", id, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Customer with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("deleted customer with id: ", id);
      result(null, res);
    });
  }
  static removeAll(result) {
    sql.query("DELETE FROM customers", (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      console.log(`deleted ${res.affectedRows} customers`);
      result(null, res);
    });
  }
}







module.exports = Customer;