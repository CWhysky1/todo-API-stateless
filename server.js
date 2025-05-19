// server.js
// A simple Express.js backend for a Todo list API

const express = require('express');
const app = express();
const PORT = 3000;
const path = require('path')

const sqlite3 = require("sqlite3").verbose();

// Create or open the 'animals.db' database.
const db = new sqlite3.Database("./mystore.sqlite", (err) => {
  if (err) {
    return console.error("Error opening database:", err.message);
  }
  console.log("Connected to the store database.");
});

db.run(`
  CREATE TABLE IF NOT EXISTS Todo (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    priority TEXT NOT NULL,
    isComplete BOOLEAN,
    isFun   BOOLEAN
  )
`, (err) => {
  if (err) {
    return console.error("Error creating table:", err.message);
  }
  console.log("Todo table created (if it didn't already exist).");
});

const insertQuery = `
  INSERT INTO Todo (id, name, priority, isComplete, isFun)
  VALUES (?, ?, ?, ?, ?)`;


// Middleware to parse JSON requests
app.use(express.json());

// TODO ➡️  Middleware to inlcude static content from 'public' folder

app.use( express.static(path.join(__dirname, 'public')))

// In-memory array to store todo items
let todos = [];
let nextId = 1;

// TODO ➡️ serve index.html from 'public' at the '/' path
app.get('/', (req, res) =>{
    res.sendFile('index.html')
})

// TODO ➡️ GET all todo items at the '/todos' path
app.get('/', (req, res) => {
  db.all("SELECT * FROM Todo", [], (err, rows) => {
    if (err) {
      return console.error("Error fetching data:", err.message);
    }
    if (!row) {
      return res.status(404).json({ error: 'Todo not found' });
    }
    console.log("All Todos:", rows);
    res.json(rows);
  });
});

// GET a specific todo item by ID
app.get('/todos/:id', (req, res) => {
  const id = parseInt(req.params.id);
  
  db.get("SELECT * FROM Todo WHERE id = ?", (req.params.id), (err, rows) => {
    if (err) {
      return console.error("Error fetching data:", err.message);
      // TODO ➡️ handle 404 status with a message of { message: 'Todo item not found' }
      res.status(404).json({message: 'Todo item not found' } )
    }
    console.log("Todos with the following id:", rows);
    res.json(rows);

  });
});

// POST a new todo item
app.post('/todo', (req, res) => {

  const id = parseInt(req.body.id);
  console.log("am I working");

  // TODO ➡️ Log every incoming TODO item in a 
  // 'todo.log' file @ the root of the project
  // In your HW, you'd INSERT a row in your db table 
  // instead of writing to file or push to array!
  db.run(insertQuery, [req.body.id, req.body.name, req.body.isComplete = false, req.body.priority = low, req.body.isFun] , function(err) {

    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(201).json({
      id: this.lastID,
      message: 'Todo added successfully'
    });
  });
});

// DELETE a todo item by ID
app.delete('/todos/:id', (req, res) => {
  const id = parseInt(req.params.id);
  //const index = todos.findIndex(item => item.id === id);
  db.run("DELETE FROM Todo WHERE id = ?",  [req.params.id], function(err) {
    if (err) {
      return console.error("Error deleting data:", err.message);
    }
    if (this.changes === 0) {
      return res.status(404).json({ error: 'Todo not found' });
    }
    
    res.json({ message: 'Todo deleted successfully' });
    console.log(`Rows deleted: ${this.changes}`);
  });
});

// Start the server
// TODO ➡️ Start the server by listening on the specified PORT
app.listen(PORT, () => {
    console.log('listening: ')
});