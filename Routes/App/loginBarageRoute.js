import express from 'express';
import { login } from '../../Controllers/App/loginBarage.js';
import { validateRequest ,validateLoginBarage } from '../../Middleware/validationMiddleware.js';

const router = express.Router();

router.post('/loginBarage' ,validateRequest(validateLoginBarage), login);

export default router;