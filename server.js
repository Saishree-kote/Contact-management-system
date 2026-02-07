const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// --- DATABASE CONNECTION ---
const db = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: 'YOUR_PASSWORD_HERE', 
    database: 'contact_db'
});

db.connect(err => {
    if (err) console.error('Connection failed: ' + err.message);
    else console.log('Successfully connected to MySQL Database!');
});

// --- ROUTES ---

// 1. Get all contacts
app.get('/api/contacts', (req, res) => {
    db.query("SELECT * FROM contacts", (err, results) => {
        if (err) return res.status(500).send(err);
        res.json(results);
    });
});

// 2. Add a new contact
app.post('/api/contacts', (req, res) => {
    const { name, email, phone } = req.body;
    const sql = "INSERT INTO contacts (name, email, phone) VALUES (?, ?, ?)";
    db.query(sql, [name, email, phone], (err, result) => {
        if (err) return res.status(500).send(err);
        res.json({ message: "Contact saved!", id: result.insertId });
    });
});

// 3. Delete a contact (ADDED THIS)
app.delete('/api/contacts/:id', (req, res) => {
    const { id } = req.params;
    const sql = "DELETE FROM contacts WHERE id = ?";
    db.query(sql, [id], (err, result) => {
        if (err) return res.status(500).send(err);
        res.json({ message: "Deleted successfully" });
    });
});

app.listen(3000, () => {
    console.log("Server is running on http://localhost:3000");
});