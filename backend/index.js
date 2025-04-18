const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
const PORT = 1516;

app.use(cors());

app.use(express.json());

const authRoutes = require('./routes/authRoutes');

app.use('/auth', authRoutes);

// ========connect sql========

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "336699",
    database: "attendance_db"
});

db.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL database:', err);
        return;
    }
    console.log('Connected to MySQL database');
});

app.listen(PORT, () => {
    console.log(`Server listening on http://localhost:${PORT}`);
});
