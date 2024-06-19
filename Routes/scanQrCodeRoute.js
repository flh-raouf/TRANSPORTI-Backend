import express from 'express';
import ScanQrCode from '../Controllers/scanQrCode.js';
import authenticateUser from '../Middleware/authMiddleware.js';

const router = express.Router();

router.get('/scanQrCode' , authenticateUser , ScanQrCode);

export default router;