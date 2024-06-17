import express from 'express';
import { register , login } from '../Controllers/authEntreprise.js';

const router = express.Router();

router.post('/loginEntreprise' , login);

router.post('/registerEntreprise' , register);

export default router;