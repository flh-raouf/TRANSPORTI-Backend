import express from 'express';
import getWeather from '../Controllers/getWeather.js';
import authenticateUser from '../Middleware/authMiddleware.js';

const router = express.Router();

router.get('/getWeather', authenticateUser, getWeather);

export default router;