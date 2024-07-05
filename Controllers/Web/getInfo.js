import jwt from 'jsonwebtoken';
import { StatusCodes } from 'http-status-codes';
import pool from '../../DB/connect.js';

const getInfo = async (req, res) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(StatusCodes.UNAUTHORIZED).json({ error: 'Authentication token missing or invalid' });
        }

        const token = authHeader.split(' ')[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const entreprise_id = decoded.id;

        // Fetch all camions for the enterprise
        const sqlCamionInfo = `
            SELECT camion_id, num_carte_grise, type_camion, num_ctrl_tech_camion, date_ctrl_tech_camion 
            FROM camion 
            WHERE entreprise_id = ?`;
        const [camionInfo] = await pool.query(sqlCamionInfo, [entreprise_id]);


        // Fetch associated chauffeurs and matieres for each camion
    
        const camionsWithDetails = [];

            for (const camion of camionInfo) {
                const { camion_id } = camion;
            
                try {
                    // Fetch chauffeur info for the camion
                    const [chauffeurInfo] = await pool.query(`
                        SELECT destination, date_heure_sortie, date_heure_arrive_prevu, CONCAT(nom, ' ', prenom) AS nom_complet 
                        FROM chauffeur 
                        WHERE camion_id = ?`,
                        [camion_id]
                    );
                
                    // Fetch matiere info for the camion
                    const [matiereInfo] = await pool.query(`
                        SELECT pictogramme 
                        FROM matiere 
                        WHERE camion_id = ?`,
                        [camion_id]
                    );
                
                    // Count the number of matieres for the camion
                    const nbrCiterne = matiereInfo.length;
                
                    // Only include chauffeurs if there are any
                    const chauffeurs = chauffeurInfo.length > 0 ? chauffeurInfo.map(chauffeur => ({
                        destination: chauffeur.destination,
                        date_heure_sortie: chauffeur.date_heure_sortie,
                        date_heure_arrive_prevu: chauffeur.date_heure_arrive_prevu,
                        nom_complet: chauffeur.nom_complet
                    })) : null;
                
                    // Only include matieres if there are any
                    const matieres = matiereInfo.length > 0 ? matiereInfo.map(matiere => ({
                        pictogramme: matiere.pictogramme // Adjust this based on your actual matiere structure
                    })) : null;
                
                    // Construct the camion details object
                    const camionDetails = {
                        num_carte_grise: camion.num_carte_grise,
                        type_camion: camion.type_camion,
                        num_ctrl_tech_camion: camion.num_ctrl_tech_camion,
                        date_ctrl_tech_camion: camion.date_ctrl_tech_camion
                    };
                
                    // Only include chauffeurs and matieres if they exist
                    if (chauffeurs) camionDetails.chauffeurs = chauffeurs;
                    if (matieres) camionDetails.matieres = matieres;
                    if (nbrCiterne > 0) camionDetails.nbrCiterne = nbrCiterne;
                
                    camionsWithDetails.push(camionDetails);
                } catch (error) {
                    console.error(`Error fetching details for camion ${camion_id}:`, error.message);
                    // Handle error as needed
                }
            }


        res.status(StatusCodes.OK).json({
            camions: camionsWithDetails
        });
    } catch (error) {
        console.error('Error in getInfo:', error.message);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Internal Server Error' });
    }
};

export default getInfo;



  
