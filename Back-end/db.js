const sqlite3 = require('sqlite3').verbose();

// Open or create the database file
const db = new sqlite3.Database('./items.db');

// Create the table if it doesn't exist
db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS items (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL
  )`);
});

module.exports = db;