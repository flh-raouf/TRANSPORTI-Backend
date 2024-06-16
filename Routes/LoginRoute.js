import express from 'express';
import { login } from '../Controllers/login.js';

const router = express.Router();

router.post('/login' , login);

export default router;