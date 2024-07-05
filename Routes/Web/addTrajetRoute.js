import express from 'express';
import AddTrajet from '../../Controllers/Web/addTrajet.js';
import authenticateUser from '../../Middleware/authMiddleware.js';
import { validateRequest, validateAddTrajet } from '../../Middleware/validationMiddleware.js';

const router = express.Router();

router.post('/addTrajet' ,validateRequest(validateAddTrajet), authenticateUser , AddTrajet);

export default router;