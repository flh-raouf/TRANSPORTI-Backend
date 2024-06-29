import express from 'express';
import ScanQrCode from '../../Controllers/App/scanQrCode.js';
import authenticateUser from '../../Middleware/authMiddleware.js';
import { validateRequest ,validateScanQrCode } from '../../Middleware/validationMiddleware.js';

const router = express.Router();

router.post('/scanQrCode' ,validateRequest(validateScanQrCode), authenticateUser , ScanQrCode);

export default router;