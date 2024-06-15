import express from 'express';
import generateCodeQr from '../Controllers/generateQrCode.js';


const router = express.Router();

router.post('/qrcodegenerate', generateCodeQr);

export default router;
