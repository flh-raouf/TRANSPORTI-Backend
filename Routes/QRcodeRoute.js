import express from 'express';
import generateCodeQr from '../Controllers/generateQrCode.js';
import authenticateUser from '../Middleware/authMiddleware.js';

const router = express.Router();

router.post('/qrcodegenerate', authenticateUser ,  generateCodeQr);

export default router;