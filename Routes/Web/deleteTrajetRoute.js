import express from 'express';
import DeleteTrajet from '../../Controllers/Web/deleteTrajet.js';
import { validateRequest, validateDelete } from '../../Middleware/validationMiddleware.js';

const router = express.Router();

router.delete('/deleteTrajet' ,validateRequest(validateDelete), DeleteTrajet);

export default router;