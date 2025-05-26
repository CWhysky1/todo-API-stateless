
const Database = require("better-sqlite3");
const path = require("path");

const isGlitch = process.env.PROJECT_DOMAIN !== undefined;
const dbPath = isGlitch
  ? path.join(__dirname, ".data", "mystore.sqlite")
  : path.join(__dirname, "mystore.sqlite");

//const DBSOURCE = path.join(__dirname, ".data", "mystore.sqlite");

const db = new Database(dbPath)
  
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