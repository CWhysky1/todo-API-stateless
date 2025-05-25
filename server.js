// server.js
// A simple Express.js backend for a Todo list API

const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const app = express();
const path = require('path');
const db = require('./mytables')

const PORT = process.env.PORT || 3000;

let bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Middleware to parse JSON requests
app.use(express.json());

// TODO ➡️  Middleware to inlcude static content from 'public' folder
app.use(express.static(path.join(__dirname, 'public')))

// TODO ➡️ serve index.html from 'public' at the '/' path
app.get('/', (req, res) =>{
    res.sendFile(path.join(__dirname, 'public/index.html'));

    console.log("so far so good");
});

// TODO ➡️ GET all todo items at the '/todos' path
app.get('/todos', (req, res) => {
  
  db.all("SELECT * FROM Todo", [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
      //return console.error("Error fetching data:", err.message);
    }
    if (!rows) {
      return res.status(404).json({ error: 'Todo not found' });
    }
    console.log("All Todos:", rows);

    res.json({
      "message":"success",
      "data":rows
    });
  });
});

// POST a new todo item
app.post('/todos', (req, res) => {

  //const { id } = req.body;
  const { name, priority, isFun } = req.body;

  const insertQuery = `
    INSERT INTO Todo (name, priority, isComplete, isFun)
    VALUES (?, ?, ?, ?)`;

  db.run(insertQuery, [name, priority, false, isFun], function(err, result) {
    if (err) {
      return res.status(400).json({ error: err.message });
    }
    res.status(200).json({
      id: this.lastID,
      message: 'Todo added successfully',
      name
    });
  });
});

// GET a specific todo item by ID
app.get('/todos/:id', (req, res) => {
  const id = parseInt(req.params.id);
  
  db.get("SELECT * FROM Todo WHERE id = ?", [id], (err, rows) => {
    if (err) {
      return console.error("Error fetching data:", err.message);
      // TODO ➡️ handle 404 status with a message of { message: 'Todo item not found' }
      res.status(500).json({error: err.message});
    }
    if (!rows) {
      return res.status(404).json({ message: 'Todo item not found' });
    }

    console.log("Todos with the following id:", rows);
    res.json(rows);

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
  console.log(`Server listening on port ${PORT}`);
});