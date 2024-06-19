import pool from '../../DB/connect.js';
import bcrypt from 'bcryptjs';
import generateCodeQr from '../../Util/generateQrCode.js';
import { StatusCodes } from 'http-status-codes'
import jwt from 'jsonwebtoken';

const AddCamion = async (req, res) => {

    try {

        const { num_carte_grise, num_control_tech_vehicule , date_control_tech_vehicule, num_control_tech_citerne, date_control_tech_citerne, type_vehicule  } = req.body;
        
        const authHeader = req.headers.authorization;
        const token = authHeader.split(' ')[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const entreprise_id = decoded.id; 

        const camion_id = await bcrypt.hash(num_carte_grise, 10);

        const sql = 'INSERT INTO camion VALUES (?, ?, ?, ?, ?, ?, ? , ?)';
        const result = await pool.query(sql, [camion_id, num_carte_grise, num_control_tech_vehicule, date_control_tech_vehicule, num_control_tech_citerne, date_control_tech_citerne, type_vehicule , entreprise_id]);
        
        await generateCodeQr(camion_id, res); 
        
        //res.status(201).send('Camion added successfully');


    } catch (error) {

        console.error(error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send('Internal Server Error');

    }

};

export default AddCamion;