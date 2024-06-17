import pool from '../DB/connect.js';
import bcrypt from 'bcryptjs';
import generateCodeQr from '../Util/generateQrCode.js';

const AddCamion = async (req, res) => {

    try {
        const { num_carte_grise, num_control_tech_vehicule , date_control_tech_vehicule, num_control_tech_citerne, date_control_tech_citerne, type_vehicule  } = req.body;
        const camion_id = await bcrypt.hash(num_carte_grise, 10);

        const sql = 'INSERT INTO camion VALUES (?, ?, ?, ?, ?, ?, ?)';

        const result = await pool.query(sql, [camion_id, num_carte_grise, num_control_tech_vehicule, date_control_tech_vehicule, num_control_tech_citerne, date_control_tech_citerne, type_vehicule]);
        
        await generateCodeQr(camion_id, res); 
        
        //res.status(201).send('Camion added successfully');


    } catch (error) {

        console.error(error);
        res.status(500).send('Internal Server Error');

    }

};

export default AddCamion;