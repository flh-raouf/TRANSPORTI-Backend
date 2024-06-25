import jwt from 'jsonwebtoken';
import { StatusCodes } from 'http-status-codes';
import pool from '../../DB/connect.js';

import getWeatherData from '../../Util/Scan/getWeather.js';
import getCamionData from '../../Util/Scan/getCamion.js';

import DangerLieALaMatiere from '../../Util/Evaluation/DangerLieALaMatiere.js';
import ProbabiliteDesAccidents from '../../Util/Evaluation/ProbabiliteDesAccidents.js';
import Trajet from '../../Util/Evaluation/Trajet.js';
import VulnerabiliteDesZonesTraversees from '../../Util/Evaluation/VulnerabiliteDesZonesTraversees.js';

import IndicePlusImportant from '../../Util/Evaluation/IndicePlusImportant.js';
import EstimRisque from '../../Util/Evaluation/EstimRisque.js';

const scanQrCode = async (req, res) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(StatusCodes.UNAUTHORIZED).json({ error: 'Authentication token missing or invalid' });
        }

        const token = authHeader.split(' ')[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const barage_id = decoded.barage_id;

        const { camion_id } = req.body;

        // Fetch weather data and camion data
        const weatherData = await getWeatherData(authHeader);
        const camionData = await getCamionData(camion_id);


        // Fetch matiere data
        const sqlMatiere = 'SELECT * FROM matiere WHERE camion_id = ?';
        const [resultMatiere] = await pool.query(sqlMatiere, [camion_id]);


        // Fetch barage data
        const sql = 'SELECT freq_accid, gravite_accid, type_route, meteo, etat_route, densite_habitation, infra_critiques_sites_sensibles, types_zones_env FROM barage_table WHERE barage_id = ?';
        const [result] = await pool.query(sql, [barage_id]);

        // Calculate evaluation values
        const probaAccident = ProbabiliteDesAccidents(result[0].freq_accid, result[0].gravite_accid);
        const trajet = Trajet(result[0].type_route, result[0].meteo, result[0].etat_route);
        const vulnerabilite = VulnerabiliteDesZonesTraversees(result[0].densite_habitation, result[0].infra_critiques_sites_sensibles, result[0].types_zones_env);

        const dangerValues = resultMatiere.map((matiere, index) => {
            if (!matiere.class || !matiere.grp_emballage || !matiere.quantite) {
                throw new Error('Missing required properties in matiere');
            }
            return {
                [`danger${index + 1}`]: DangerLieALaMatiere(matiere.class, matiere.grp_emballage, matiere.quantite)
            };
        });

        const indiceMetriser = IndicePlusImportant(probaAccident, trajet, vulnerabilite);

        const maxDangerValue = Math.max(...dangerValues.map(dangerValue => Object.values(dangerValue)[0]));
        const estimationRisque = EstimRisque(maxDangerValue,probaAccident, trajet, vulnerabilite);


        res.status(StatusCodes.OK).json({
            weather: weatherData,
            camionData,
            matiereData: resultMatiere,
            dangerValues,
            probaAccident,
            trajet,
            vulnerabilite,
            indiceMetriser,
            estimationRisque,
            maxDangerValue
        });
    } catch (error) {
        console.error('Error in scanQrCode:', error.message);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Internal Server Error' });
    }
};

export default scanQrCode;
