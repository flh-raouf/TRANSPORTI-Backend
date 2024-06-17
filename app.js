import express from 'express';
import getCamion from './Routes/getCamionRoute.js';
import getWeather from './Routes/getWeatherRoute.js';
import login from './Routes/LoginRoute.js';
import addCamion from './Routes/AddCamionRoute.js';


const app = express();

app.use(express.json());

app.use('/api', login);

app.use('/api/camion', getCamion );

app.use('/api/camion', addCamion );

app.use('/api/weather', getWeather);


const PORT = process.env.PORT || 8080;
app.listen( PORT , () => {
    console.log(`Server is running on port ${PORT}`);
});