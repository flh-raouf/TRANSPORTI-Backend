import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { StatusCodes } from 'http-status-codes';
import pool from '../DB/connect.js';
import dotenv from 'dotenv';
import { v4 as uuidv4 } from 'uuid'; // Import uuid for generating random strings

dotenv.config();

const register = async (req, res) => {
    try {
        const { email, name, password } = req.body;
        const image = req.file ? req.file.buffer : null;

        if (!email || !name || !password) {
            return res.status(StatusCodes.BAD_REQUEST).json({ error: 'Please provide email, password, and name' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const id = uuidv4(); // Generate a random string as ID

        const sql = 'INSERT INTO entreprise_table VALUES (?, ?, ?, ?, ?)';
        await pool.query(sql, [id, name, email, hashedPassword, image]);

        const token = jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.status(StatusCodes.CREATED).json({
            success: true,
            user: {
                token,
                id,
                name,
                email
            }
        });
    } catch (error) {
        console.error(error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Internal Server Error' });
    }
};




const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(StatusCodes.BAD_REQUEST).json({ error: 'Please provide email and password' });
        }

        const [rows] = await pool.query('SELECT * FROM entreprise_table WHERE email = ?', [email]);
        const user = rows[0];

        if (!user) {
            return res.status(StatusCodes.UNAUTHORIZED).json({ error: 'Invalid email' });
        }

        const isCorrectPassword = await bcrypt.compare(password, user.password);
        if (!isCorrectPassword) {
            return res.status(StatusCodes.UNAUTHORIZED).json({ error: 'Invalid password' });
        }

        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        return res.status(StatusCodes.OK).json({
            token,
            id: user.id,
            email: user.email
        });
    } catch (error) {
        console.error(error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Internal Server Error' });
    }
};




export { register , login };
