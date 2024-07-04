import pool from '../../DB/connect.js';
import { StatusCodes } from 'http-status-codes';
import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';

dotenv.config();

// Configure Cloudinary with your credentials
cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET 
});

// Function to delete an image from Cloudinary by its URL
const deleteImageFromCloudinary = async (imageUrl) => {
    try {
        const publicId = getImagePublicId(imageUrl);
        const deletionResult = await cloudinary.uploader.destroy(publicId);
        console.log(`Deleted image ${publicId} from Cloudinary:`, deletionResult);
        return deletionResult;
    } catch (error) {
        console.error('Error deleting image from Cloudinary:', error);
        throw error;
    }
};

// Function to extract public_id from Cloudinary URL
const getImagePublicId = (imageUrl) => {
    const parts = imageUrl.split('/');
    const fileName = parts[parts.length - 1]; // e.g., 'example.jpg'
    const publicId = fileName.split('.')[0]; // remove file extension
    return publicId;
};

const AddTrajet = async (req, res) => {
    const { camion_id, chauffeurs, matieres } = req.body;

    if (!camion_id || !chauffeurs || !matieres) {
        return res.status(StatusCodes.BAD_REQUEST).json({ error: 'Please provide camion_id, chauffeurs, and matieres' });
    }

    try {
        // Fetch and delete images associated with chauffeurs from Cloudinary
        const [chauffeurImages] = await pool.query('SELECT photo_conducteur FROM chauffeur WHERE camion_id = ?', [camion_id]);
        await Promise.all(chauffeurImages.map(async (imageRow) => {
            const imageUrl = imageRow.photo_conducteur;
            if (imageUrl) {
                await deleteImageFromCloudinary(imageUrl);
            }
        }));

        // Delete records from chauffeur and matiere tables
        await Promise.all([
            pool.query('DELETE FROM chauffeur WHERE camion_id = ?', [camion_id]),
            pool.query('DELETE FROM matiere WHERE camion_id = ?', [camion_id])
        ]);

        // Insert new chauffeurs with possible image uploads
        await Promise.all(chauffeurs.map(async (chauffeur) => {
            const {
                nom, prenom, num_attestation, num_brevet_matiere_dangeureuse, photo_conducteur,
                source, destination, date_heure_sortie, date_heure_arrive_prevu
            } = chauffeur;

            let photoConducteurUrl = null;
            if (photo_conducteur) {
                const uploadResult = await cloudinary.uploader.upload(photo_conducteur, {
                    folder: 'conducteur_photos'
                });
                photoConducteurUrl = uploadResult.secure_url;
            }

            await pool.query(
                `INSERT INTO chauffeur 
                (nom, prenom, num_attestation, num_brevet_matiere_dangeureuse, photo_conducteur, source, destination, date_heure_sortie, date_heure_arrive_prevu, camion_id) 
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
                [nom, prenom, num_attestation, num_brevet_matiere_dangeureuse, photoConducteurUrl, source, destination, date_heure_sortie, date_heure_arrive_prevu, camion_id]
            );
        }));

        // Insert new matieres with possible image uploads
        await Promise.all(matieres.map(async (matiere) => {
            const {
                nom, class: classMatiere, pictogramme, type, code_classification, quantite, grp_emballage,
                code_restriction_tunnel, code_danger, num_onu, num_ctrl_tech_citerne, date_ctrl_tech_citerne,
                num_assurance_citerne, date_assurance_citerne
            } = matiere;

            let pictogrammeUrl = null;
            if (pictogramme) {
                const uploadResult = await cloudinary.uploader.upload(pictogramme, {
                    folder: 'matiere_pictogrammes'
                });
                pictogrammeUrl = uploadResult.secure_url;
            }

            await pool.query(
                `INSERT INTO matiere 
                (nom, class, pictogramme, type, code_classification, quantite, grp_emballage, code_restriction_tunnel, code_danger, num_onu, 
                num_ctrl_tech_citerne, date_ctrl_tech_citerne, num_assurance_citerne, date_assurance_citerne, camion_id) 
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
                [nom, classMatiere, pictogrammeUrl, type, code_classification, quantite, grp_emballage, code_restriction_tunnel, code_danger, num_onu,
                 num_ctrl_tech_citerne, date_ctrl_tech_citerne, num_assurance_citerne, date_assurance_citerne, camion_id]
            );
        }));

        res.status(StatusCodes.CREATED).json({ message: 'Trajet added successfully' });
    } catch (error) {
        console.error('Error adding trajet:', error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Internal Server Error' });
    }
};

export default AddTrajet;
