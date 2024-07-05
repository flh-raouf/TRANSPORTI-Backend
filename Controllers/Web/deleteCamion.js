import pool from '../../DB/connect.js';
import { StatusCodes } from 'http-status-codes';

const deleteCamion = async (req , res) => {

    const camion_id = req.body.comion_id;

    if (!camion_id) {
        return res.status(StatusCodes.BAD_REQUEST).json({ error: 'Please provide camion_id' });
    }

    const sql = 'DELETE FROM camion WHERE camion_id = ?' ;
    const result = await pool.query(sql,[camion_id]);
    
    return res.status(StatusCodes.OK).json({ message: 'Camion deleted successfully' });

}

export default deleteCamion;