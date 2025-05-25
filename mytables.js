
const sqlite3 = require("sqlite3").verbose();
const path = require("path");
const DBSOURCE = path.join(__dirname, "mystore.sqlite");

const db = new sqlite3.Database(DBSOURCE, (err) => {
  if (err) {
    return console.error("Error opening database:", err.message);
  }

  console.log("Connected to the store database.");

  db.serialize(() => {
    db.run(`
      CREATE TABLE IF NOT EXISTS Todo (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        priority TEXT NOT NULL,
        isComplete INTEGER DEFAULT 0,
        isFun INTEGER DEFAULT 0
      )
    `, (err) => {
      if (err) {
        return console.error("Error creating Todo table:", err.message);
      }
      console.log("Todo table created (if it didn't already exist).");
    });
  });
});

module.exports = db;
