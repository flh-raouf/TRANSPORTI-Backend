import pool from '../DB/connect.js';
import { StatusCodes } from 'http-status-codes';
import jwt from 'jsonwebtoken';

const AddAccident = async (req, res) => {
    try {
        const gravite_accident = req.body.gravite_accident;
        
        const authHeader = req.headers.authorization;
        const token = authHeader.split(' ')[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const barageId = decoded.barage_id;

        const insertAccidentSql = 'INSERT INTO accident_table (gravite_accident, barage_id) VALUES (?, ?)';
        await pool.query(insertAccidentSql, [gravite_accident, barageId]);



        const [freqRows] = await pool.query('SELECT COUNT(*) AS freq FROM accident_table WHERE barage_id = ?', [barageId]);
        const freq = freqRows[0].freq;

        const [gravRows] = await pool.query('SELECT gravite_accident, COUNT(*) AS grav_count FROM accident_table GROUP BY gravite_accident ORDER BY grav_count DESC LIMIT 1');
        const grav = gravRows[0].gravite_accident;

        const updateBarageSql = 'UPDATE barage_table SET freq_accid = ?, gravite_accid = ? WHERE barage_id = ?';
        await pool.query(updateBarageSql, [freq, grav, barageId]);


        
        res.status(StatusCodes.CREATED).send('Accident added and barage table updated successfully');
    } catch (error) {
        console.error('Error adding accident:', error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send('Internal Server Error');
    }
};

export default AddAccident;
