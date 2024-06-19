import express from 'express';
import addAccidentRoute from './addAccidentRoute.js';
import loginBarageRoute from './loginBarageRoute.js';
import scanQrCodeRoute from './scanQrCodeRoute.js';

const router = express.Router();

router.use('/accident', addAccidentRoute);
router.use('/Barage', loginBarageRoute);
router.use(scanQrCodeRoute);

export default router;
