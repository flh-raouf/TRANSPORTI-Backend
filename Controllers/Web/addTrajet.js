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
        const result = await cloudinary.v2.api.delete_resources(`${resourceType}/${publicId}`, { type: 'upload', resource_type: 'image' });
        console.log(`Deleted ${result.deleted[publicId].resource_type} with public_id ${publicId}`);
    } catch (error) {
        console.error(`Error deleting ${resourceType} with public_id ${publicId}:`, error.message);
    }
};

const extractPublicId = (imageUrl) => {
    try {
        const parts = imageUrl.split('/');
        const fileNameWithExtension = parts[parts.length - 1];
        const publicId = fileNameWithExtension.split('.')[0];
        console.log('Extracted public_id:', publicId);
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
            if (chauffeur.photo_conducteur) {
                const publicId = extractPublicId(chauffeur.photo_conducteur);
                if (publicId) {
                    await deleteImageFromCloudinary(publicId, 'conducteur_photos');
                }
            }
        }));

        const deletionResultsMatieres = await Promise.all(matieres.map(async (matiere) => {
            if (matiere.pictogramme) {
                const publicId = extractPublicId(matiere.pictogramme);
                if (publicId) {
                    await deleteImageFromCloudinary(publicId, 'matiere_pictogrammes');
                }
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
