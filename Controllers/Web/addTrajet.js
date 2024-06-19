import pool from '../../DB/connect.js';
import { StatusCodes } from 'http-status-codes'

const AddTrajet = async (req , res) =>{

    const { camion_id , chauffeurs , matieres } = req.body

        if (!camion_id || !chauffeurs || !matieres) {
            return res.status(StatusCodes.BAD_REQUEST).json({ error: 'Please provide camion_id, chauffeurs and matieres' });
        }

        try {

            await pool.query('DELETE FROM chauffeur WHERE camion_id = ?',camion_id);
            await pool.query('DELETE FROM matiere WHERE camion_id = ?',camion_id);

            for (const chauffeur of chauffeurs) {
                const { nom, prenom, num_attestation, num_brevet_marchendise, num_brevet_metiere_dangeureuse } = chauffeur;
                
                await pool.query(
                    'INSERT INTO chauffeur (nom, prenom, num_attestation, num_brevet_marchendise, num_brevet_metiere_dangeureuse , camion_id) VALUES (?, ?, ?, ?, ?, ?)',
                    [nom, prenom, num_attestation, num_brevet_marchendise, num_brevet_metiere_dangeureuse, camion_id]
                );
            }

            for (const matiere of matieres) {
                const { class:classmatiere, pectorgramme, code_classification, grp_emballage, qt_lim_excepte, code_restriction, num_auth_produit, inst_emballage, inst_special, code_citerne }=matiere;
                
                const pectorgrammeBuffer = Buffer.from(pectorgramme);
                const numAuthProduitBuffer = Buffer.from(num_auth_produit);

                await pool.query(
                    'INSERT INTO matiere (class, pectorgramme, code_classification, grp_emballage, qt_lim_excepte, code_restriction, num_auth_produit, inst_emballage, inst_special, code_citerne, camion_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
                    [classmatiere, pectorgrammeBuffer, code_classification, grp_emballage, qt_lim_excepte, code_restriction, numAuthProduitBuffer, inst_emballage, inst_special, code_citerne, camion_id]
                );
            }

            res.status(StatusCodes.CREATED).json({ message: 'Trajet added successfully' });
        } catch (error) {
            console.error(error);
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Internal Server Error' });
        }
    
}

export default AddTrajet;