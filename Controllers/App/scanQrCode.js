import jwt from 'jsonwebtoken';
import { StatusCodes } from 'http-status-codes';
import pool from '../../DB/connect.js';
import getWeatherData from '../../Util/getWeather.js';
import getCamionData from '../../Util/getCamion.js';

const scanQrCode = async (req, res) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(StatusCodes.UNAUTHORIZED).json({ error: 'Authentication token missing or invalid' });
        }

        const token = authHeader.split(' ')[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const { camion_id } = req.body;

        const weatherData = await getWeatherData(authHeader);
        const camionData = await getCamionData(camion_id);

        res.status(StatusCodes.OK).json({
            weather: weatherData,
            camionData
        });
    } catch (error) {
        console.error('Error in scanQrCode:', error.message);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Internal Server Error' });
    }
};

export default scanQrCode;
