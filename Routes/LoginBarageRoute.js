import express from 'express';
import { login } from '../Controllers/loginBarage.js';

const router = express.Router();

router.post('/loginBarage' , login);

export default router;