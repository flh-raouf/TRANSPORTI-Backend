import express from 'express';
import getCamion from './Routes/getCamionRoute.js';
import getWeather from './Routes/getWeatherRoute.js';
import loginBarage from './Routes/loginBarageRoute.js';
import addCamion from './Routes/addCamionRoute.js';
import addTrajet from './Routes/addTrajetRoute.js';
import authEntreprise from './Routes/authEntrepriseRoute.js';
import addAccident from './Routes/addAccidentRoute.js';


const app = express();

app.use(express.json());

app.use('/api/barage', loginBarage);

app.use('/api/entreprise', authEntreprise);

/***************************************************** */

app.use('/api/camion', addCamion );

app.use('/api/trajet' ,addTrajet);

/***************************************************** */

app.use('/api/accident', addAccident);

app.use('/api/camion', getCamion );

app.use('/api/weather', getWeather);


const PORT = process.env.PORT || 8080;
app.listen( PORT , () => {
    console.log(`Server is running on port ${PORT}`);
});