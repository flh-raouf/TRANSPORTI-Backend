import express from 'express';
import DeleteCamion from '../../Controllers/Web/deleteCamion.js';
import { validateRequest, validateDelete } from '../../Middleware/validationMiddleware.js';

const router = express.Router();

router.delete('/deleteCamion' ,validateRequest(validateDelete), DeleteCamion);

export default router;