import express from 'express';
import AddCamion from '../../Controllers/Web/addCamion.js';
import authenticateUser from '../../Middleware/authMiddleware.js';
import { validateRequest, validateAddCamion } from '../../Middleware/validationMiddleware.js';

const router = express.Router();

router.post('/addCamion' , validateRequest(validateAddCamion), authenticateUser , AddCamion);

export default router;