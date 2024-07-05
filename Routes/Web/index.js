import express from 'express';

import addCamionRoute from './addCamionRoute.js';
import deleteCamionRoute from './deleteCamionRoute.js';

import addTrajetRoute from './addTrajetRoute.js';
import deleteTrajetRoute from './deleteTrajetRoute.js';

import authEntrepriseRoute from './authEntrepriseRoute.js';
import getInfo from './getInfoRoute.js';

const router = express.Router();

router.use('/entreprise', authEntrepriseRoute);

router.use('/camion', addCamionRoute);
router.use('/camion', deleteCamionRoute);

router.use('/trajet', addTrajetRoute);
router.use('/trajet', deleteTrajetRoute);

router.use(getInfo);

export default router;
