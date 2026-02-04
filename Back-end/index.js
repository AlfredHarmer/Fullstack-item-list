//Import dependencies
const express = require('express');
const cors = require('cors');
const db = require('./db'); // SQLite database connection

const app = express();

//Middleware
app.use(cors({
     origin: "http://localhost:3001", // React dev server
  methods: ["GET", "POST"]
}));
app.use(express.json());


//GET /items - fetch all items from the database
app.get('/items', (req, res) => {
  db.all('SELECT * FROM items', [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    console.log('GET /items called');
    res.json(rows); // send array to frontend
  });
});


// POST /items — add a new item to database
app.post('/items', (req, res) => {
  const { name } = req.body;
  db.run('INSERT INTO items (name) VALUES (?)', [name], function(err) {
    if (err) return res.status(500).json({ error: err.message });
    console.log('Added:', { id: this.lastID, name });
    res.status(201).json({ id: this.lastID, name });
  });
});

//Start server
app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});