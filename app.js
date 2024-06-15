import express from 'express';
import QrCodegenerate from './Routes/QRcodeRoute.js';
import getCamion from './Routes/CamionRoute.js';
import getWeather from './Controllers/getWeather.js';
import loginRoute from './Routes/LoginRoute.js';


const app = express();

app.use(express.json());

app.use('/api', loginRoute);

app.use('/api/qrcode',QrCodegenerate);

app.use('/api/camion', getCamion );

app.use('/api/weather', getWeather);


const PORT = process.env.PORT || 8080;
app.listen( process.env.PORT , () => {
    console.log('Server is running on port 8080');
});