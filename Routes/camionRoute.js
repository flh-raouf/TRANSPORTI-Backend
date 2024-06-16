import express from 'express';
import getCamion from '../Controllers/getCamion.js';
import authenticateUser from '../Middleware/authMiddleware.js';
const router = express.Router();

router.post('/camion' , authenticateUser , getCamion);


export default router;