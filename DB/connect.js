import mysql from 'mysql2';
import dotenv from 'dotenv';

dotenv.config();

// Creating a connection pool
const pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    waitForConnections: true,
    connectionLimit: 1000,  // Set a high connection limit, but not unlimited
    queueLimit: 0
}).promise();

export default pool;
