const { db } = require("../utility/database");

UserServices = {};

UserServices.handleLogin = async ( username, password) => {

  return new Promise((resolve, reject) => {
    let sql = `SELECT id, username, password FROM users WHERE username = ?`;
    return db.get(sql, [username], function (err, row) {
      if (err) {
        console.error("DB Error: ", err.message);
        return reject(err.message);
      }
      if (row.password == password) {
        return resolve(row);
      }
      return reject("Username and password not matched");
    });
  });
};

UserServices.handleRegister = async ( username, password) => {

  return new Promise((resolve, reject) => {
    let sql = `SELECT * FROM users WHERE username  = ?`;
    return db.get(sql, [username], function (err, row) {
      if (err) {
        console.error("DB Error: ", err.message);
        return reject(err.message);
      }
      if (row && row.id) {
        return reject("Sorry , This username already taken");
      } else {
        db.run(
          `INSERT INTO users (name, username, password) VALUES(? , ? , ? )`,
          [username, username, password]
        );
        resolve(true);
      }
      return reject("Username and password not matched");
    });
  });
};

module.exports = UserServices;
