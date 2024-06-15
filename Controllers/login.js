import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { StatusCodes } from 'http-status-codes';
import pool from '../DB/connect.js';
import dotenv from 'dotenv';

dotenv.config();

const login = async (req, res) => {
    const { barage_id, password } = req.body;
    if (!barage_id || !password) {
        return res.status(StatusCodes.BAD_REQUEST).json({ error: 'Please provide Barage ID and password' });
    }

    const [rows] = await pool.query('SELECT * FROM barage_table WHERE barage_id = ?', [barage_id]);
    const user = rows[0];

    if (!user) {
        return res.status(StatusCodes.UNAUTHORIZED).json({ error: 'Invalid barage_id' });
    }

    const isCorrectPassword = await bcrypt.compare(password, user.password);
    if (!isCorrectPassword) {
        return res.status(StatusCodes.UNAUTHORIZED).json({ error: 'Invalid password' });
    }

    const token = jwt.sign({ barage_id: user.barage_id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    return res.status(StatusCodes.OK).json({
        token,
        barage_id: user.barage_id
    });
};

export { login };
