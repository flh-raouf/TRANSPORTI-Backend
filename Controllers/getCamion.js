import pool from '../DB/connect.js';
import { StatusCodes } from 'http-status-codes'

const getCamion =  async (req, res) => {
  try {    
    const camion_id = req.body.camion_id;

    let sql = 'SELECT * FROM camion WHERE camion_id = ?'; 
    const result = await pool.query(sql,[camion_id]); 
    
    let sql2 = 'SELECT * FROM chauffeur WHERE  camion_id = ?';
    const result2 = await pool.query(sql2,[camion_id ]);

    let sql3 = 'SELECT * FROM matiere WHERE  camion_id = ?';
    const result3 = await pool.query(sql3,[camion_id ]);
   
    res.status(200).send({info_camion : result[0], info_chauffeur : result2[0] , info_matiere : result3[0]});

  } catch (error) {
      console.error(error);
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).send('Internal Server Error');
  }
}

export default getCamion;