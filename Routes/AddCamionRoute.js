import express from 'express';
import AddCamion from '../Controllers/addCamion.js';
import authenticateUser from '../Middleware/authMiddleware.js';
const router = express.Router();

router.post('/addCamion' , authenticateUser , AddCamion);


export default router;