import express from 'express';
import addCamionRoute from './addCamionRoute.js';
import addTrajetRoute from './addTrajetRoute.js';
import authEntrepriseRoute from './authEntrepriseRoute.js';
import getInfo from './getInfoRoute.js';

const router = express.Router();

router.use('/camion', addCamionRoute);
router.use('/trajet', addTrajetRoute);
router.use('/entreprise', authEntrepriseRoute);
router.use(getInfo);

export default router;
