import express from 'express';
import getCamion from '../Controllers/getCamion.js';
const router = express.Router();

router.post('/camion', getCamion);


export default router;

