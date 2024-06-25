import pool from '../../DB/connect.js';
import { StatusCodes } from 'http-status-codes';

const getCamionData = async (camion_id) => {
    try {
        // Fetch camion info
        const camionSql = 'SELECT * FROM camion WHERE camion_id = ?'; 
        const [camionResult] = await pool.query(camionSql, [camion_id]);
        
        // Fetch chauffeur info
        const chauffeurSql = 'SELECT * FROM chauffeur WHERE camion_id = ?';
        const [chauffeurResult] = await pool.query(chauffeurSql, [camion_id]);
        
        // Fetch matiere info, but only the required fields
        const matiereSql = `
            SELECT num_ctrl_tech_citerne, date_ctrl_tech_citerne, num_assurance_citerne, date_assurance_citerne
            FROM matiere
            WHERE camion_id = ?
        `;
        const [matiereResult] = await pool.query(matiereSql, [camion_id]);
        
        return {
            info_camion: camionResult,
            info_matiere: matiereResult,
            info_chauffeur: chauffeurResult
        };
    } catch (error) {
        console.error('Error fetching camion data:', error.message);
        throw error;
    }
};

export default getCamionData;
