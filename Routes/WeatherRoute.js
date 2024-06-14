import express from 'express';
import getWeather from '../Controllers/getWeather.js';

const router = express.Router();

router.post('/getWeather', getWeather);

export default router;
