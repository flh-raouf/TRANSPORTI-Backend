import pool from '../../DB/connect.js';
import { StatusCodes } from 'http-status-codes';
import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';

import {extractPublicId , deleteImageFromCloudinary} from '../../Util/cloudinaryDelete.js';

dotenv.config();

cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET 
});


const deleteCamion = async (req , res) => {

    const camion_id = req.body.camion_id;

    if (!camion_id) {
        return res.status(StatusCodes.BAD_REQUEST).json({ error: 'Please provide camion_id' });
    }

    const [chauffeurRows] = await pool.query('SELECT photo_conducteur FROM chauffeur WHERE camion_id = ?', [camion_id]);
        await Promise.all(chauffeurRows.map(async (row) => {
            if (row.photo_conducteur) {
                const publicId = extractPublicId(row.photo_conducteur);
                if (publicId) {
                    await deleteImageFromCloudinary(publicId, 'conducteur_photos');
                }
            }
        }));

        // Fetch and delete pictogramme for the given camion_id
        const [matiereRows] = await pool.query('SELECT pictogramme FROM matiere WHERE camion_id = ?', [camion_id]);
        await Promise.all(matiereRows.map(async (row) => {
            if (row.pictogramme) {
                const publicId = extractPublicId(row.pictogramme);
                if (publicId) {
                    await deleteImageFromCloudinary(publicId, 'matiere_pictogrammes');
                }
            }
        }));



        const [QrCodeRows] = await pool.query('SELECT qrcode_img FROM qr_code WHERE camion_id = ?', [camion_id]);
        await Promise.all(QrCodeRows.map(async (row) => {
            if (row.qrcode_img) {
                const publicId = extractPublicId(row.qrcode_img);
                if (publicId) {
                    await deleteImageFromCloudinary(publicId, 'qrcodes');
                }
            }
        }));




    await pool.query('DELETE FROM chauffeur WHERE camion_id = ?', [camion_id]);
    await pool.query('DELETE FROM matiere WHERE camion_id = ?', [camion_id]);
    await pool.query('DELETE FROM camion WHERE camion_id = ?',[camion_id]);
    
    return res.status(StatusCodes.OK).json({ message: 'Camion deleted successfully' });

}

export default deleteCamion;