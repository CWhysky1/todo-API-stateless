
const Database = require("sqlite3").verbose();
const path = require("path");

const isGlitch = process.env.PROJECT_DOMAIN !== undefined;
const dbPath = isGlitch
  ? path.join(__dirname, ".data", "mystore.sqlite")
  : path.join(__dirname, "mystore.sqlite");

const db = new Database(dbPath, (err) => {
  if (err) {
    console.error("Could not connect to the database:", err.message);
  } else {
    console.log("Connected to the SQLite database.");
  }
});

try {
  db.prepare(`
    CREATE TABLE IF NOT EXISTS Todo (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      priority TEXT NOT NULL,
      isComplete INTEGER DEFAULT 0,
      isFun INTEGER DEFAULT 0
    )
  `).run();

  console.log("Todo table created (if it didn't already exist).");
} catch (err) {
  console.error("Error setting up the database:", err.message);
}

module.exports = db;