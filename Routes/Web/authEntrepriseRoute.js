import express from 'express';
import { register , login } from '../../Controllers/Web/authEntreprise.js';
import { validateRequest ,validateRegisterEntreprise , validateLoginEntreprise } from '../../Middleware/validationMiddleware.js';

const router = express.Router();

router.post('/loginEntreprise' ,validateRequest(validateLoginEntreprise), login);

router.post('/registerEntreprise' ,validateRequest(validateRegisterEntreprise), register);

export default router;