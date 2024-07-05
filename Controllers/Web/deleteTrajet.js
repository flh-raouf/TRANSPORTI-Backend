import pool from '../../DB/connect.js';
import { StatusCodes } from 'http-status-codes';

const deleteCamion = async (req , res) => {

    const camion_id = req.body.camion_id;

    if (!camion_id) {
        return res.status(StatusCodes.BAD_REQUEST).json({ error: 'Please provide camion_id' });
    }

    const sql = 'DELETE FROM chauffeur WHERE camion_id = ?' ;
    const result = await pool.query(sql,[camion_id]);

    const sql2 = 'DELETE FROM matiere WHERE camion_id = ?' ;
    const result2 = await pool.query(sql2,[camion_id]);
    
    return res.status(StatusCodes.OK).json({ message: 'Trajet deleted successfully' });

}

export default deleteCamion;