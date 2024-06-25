
// This script is used to hash all the passwords in the database. It is a one-time script and should be run only once.

import bcrypt from 'bcryptjs';
import pool from '../../DB/connect.js';

const hashPasswords = async () => {
    const [users] = await pool.query('SELECT barage_id, password FROM barage_table');
    
    for (const user of users) {
        const hashedPassword = await bcrypt.hash(user.password, 10);
        await pool.query('UPDATE barage_table SET password = ? WHERE barage_id = ?', [hashedPassword, user.barage_id]);
    }
    
    console.log('Passwords hashed successfully');
};

hashPasswords();