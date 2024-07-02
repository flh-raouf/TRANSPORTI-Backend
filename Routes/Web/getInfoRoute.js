import express from 'express';
import getInfo from '../../Controllers/Web/getInfo.js';
import authenticateUser from '../../Middleware/authMiddleware.js';


const router = express.Router();

router.get('/getInfo',authenticateUser, getInfo);
export default router;
