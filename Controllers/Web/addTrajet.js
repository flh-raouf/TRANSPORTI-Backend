import pool from '../../DB/connect.js';
import { StatusCodes } from 'http-status-codes';
import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';





dotenv.config();

cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET 
});





const deleteImageFromCloudinary = async (publicId, resourceType) => {
    try {
        const result = await cloudinary.api.delete_resources([`${resourceType}/${publicId}`], { type: 'upload', resource_type: 'image' });
        console.log(`Deleted ${resourceType} with public_id ${publicId}`);
    } catch (error) {
        console.error(`Error deleting ${resourceType} with public_id ${publicId}:`, error.message );
    }
};

// Function to extract public_id from Cloudinary URL
const extractPublicId = (imageUrl) => {
    try {
        // Split the URL by '/' and get the last part
        const parts = imageUrl.split('/');
        let lastPart = parts.pop();

        // Remove the file extension (e.g., '.jpg', '.png') if present
        const publicId = lastPart.split('.')[0];

        return publicId;
    } catch (error) {
        console.error('Error extracting public_id:', error);
        return null; // Handle error gracefully if needed
    }
};





const AddTrajet = async (req, res) => {
    const { camion_id, chauffeurs, matieres } = req.body;

    if (!camion_id || !chauffeurs || !matieres) {
        return res.status(StatusCodes.BAD_REQUEST).json({ error: 'Please provide camion_id, chauffeurs, and matieres' });
    }

    try {
        // Delete images from Cloudinary and then from database
        const deletionResultsChauffeurs = await Promise.all(chauffeurs.map(async (chauffeur) => {
            try {
                const [rows] = await pool.query('SELECT photo_conducteur FROM chauffeur WHERE camion_id = ?', [camion_id]);
                if (rows.length > 0 && rows[0].photo_conducteur) {
                    const imageUrl = rows[0].photo_conducteur;
                    const publicId = extractPublicId(imageUrl);
                    if (publicId) {
                        await deleteImageFromCloudinary(publicId, 'conducteur_photos');
                    }
                }
            } catch (error) {
                console.error('Error fetching and deleting photo_conducteur:', error);
            }
        }));
        
        const deletionResultsMatieres = await Promise.all(matieres.map(async (matiere) => {
            try {
                const [rows] = await pool.query('SELECT pictogramme FROM matiere WHERE camion_id = ?', [camion_id]);
                if (rows.length > 0 && rows[0].pictogramme) {
                    const imageUrl = rows[0].pictogramme;
                    const publicId = extractPublicId(imageUrl);
                    if (publicId) {
                        await deleteImageFromCloudinary(publicId, 'matiere_pictogrammes');
                    }
                }
            } catch (error) {
                console.error('Error fetching and deleting pictogramme:', error);
            }
        }));


        

        await pool.query('DELETE FROM chauffeur WHERE camion_id = ?', [camion_id]);
        await pool.query('DELETE FROM matiere WHERE camion_id = ?', [camion_id]);

        for (const chauffeur of chauffeurs) {
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
        }

        for (const matiere of matieres) {
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
        }

        res.status(StatusCodes.CREATED).json({ message: 'Trajet added successfully' });
    } catch (error) {
        console.error(error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Internal Server Error' });
    }
};

export default AddTrajet;
