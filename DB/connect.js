// connect.js

const mysql = require('mysql2');
import dotenv from 'dotenv';

dotenv.config(); // Load environment variables from .env file

// Creating a connection pool
const db = mysql.createConnection({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
}).promise();

// Connexion à la base de données
db.connect((err) => {
    if (err) {
        console.error('Erreur de connexion à la base de données:', err);
        throw err;
    }
    console.log('Connecté à la base de données MySQL');
});

module.exports = db;
