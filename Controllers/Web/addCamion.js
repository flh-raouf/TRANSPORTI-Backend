import pool from '../../DB/connect.js';
import bcrypt from 'bcryptjs';
import generateCodeQr from '../../Util/generateQrCode.js';
import { StatusCodes } from 'http-status-codes';
import jwt from 'jsonwebtoken';

const AddCamion = async (req, res) => {
    try {
        const { num_carte_grise, type_camion, num_ctrl_tech_camion, date_ctrl_tech_camion } = req.body;

        const authHeader = req.headers.authorization;
        const token = authHeader.split(' ')[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const entreprise_id = decoded.id;

        const camion_id = await bcrypt.hash(num_carte_grise, 10);

        const sql = 'INSERT INTO camion (camion_id, num_carte_grise, type_camion, num_ctrl_tech_camion, date_ctrl_tech_camion, entreprise_id) VALUES (?, ?, ?, ?, ?, ?)';
        await pool.query(sql, [camion_id, num_carte_grise, type_camion, num_ctrl_tech_camion, date_ctrl_tech_camion, entreprise_id]);

        try {
            const qrCodeData = await generateCodeQr(camion_id); // Call generateCodeQr without passing `res`

            res.status(StatusCodes.CREATED).json({
                message: 'Camion added successfully',
                qrCodeData // Include qrCodeData in the response
            });
        } catch (error) {
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).send('Error generating QR Code');
        }
    } catch (error) {
        console.error(error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send('Internal Server Error');
    }
};

export default AddCamion;
