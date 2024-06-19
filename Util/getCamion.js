import pool from '../DB/connect.js';
import { StatusCodes } from 'http-status-codes';

const getCamionData = async (camion_id) => {
    try {
        const sql = 'SELECT * FROM camion WHERE camion_id = ?'; 
        const [result] = await pool.query(sql, [camion_id]);
        
        const sql2 = 'SELECT * FROM chauffeur WHERE camion_id = ?';
        const [result2] = await pool.query(sql2, [camion_id]);
        
        const sql3 = 'SELECT * FROM matiere WHERE camion_id = ?';
        const [result3] = await pool.query(sql3, [camion_id]);
        
        return {
            info_camion: result,
            info_chauffeur: result2,
            info_matiere: result3
        };
    } catch (error) {
        console.error('Error fetching camion data:', error.message);
        throw error;
    }
};

export default getCamionData;
