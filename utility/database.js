var sqlite3 = require("sqlite3").verbose();

const DBSOURCE = "./db/sqlite.db";

let db = new sqlite3.Database(DBSOURCE, (err) => {
  if (err) {
    throw err;
  }
  console.log("Connected to the sqlite database.");
});

const createAllTable = (db) =>
  db.serialize(() => {
    let sql = `CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name text, 
        username text UNIQUE, 
        password text, 
        token text, 
        CONSTRAINT username_unique UNIQUE (username))`;

    db.run(sql);
  });

module.exports = { db, createAllTable };
