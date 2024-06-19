import express from 'express';

import loginBarage from './Routes/loginBarageRoute.js';
import authEntreprise from './Routes/authEntrepriseRoute.js';

import addCamion from './Routes/addCamionRoute.js';
import addTrajet from './Routes/addTrajetRoute.js';

import addAccident from './Routes/addAccidentRoute.js';
import scanQrCode from './Routes/scanQrCodeRoute.js';



const app = express();
app.use(express.json());


app.use('/api/barage', loginBarage);

app.use('/api/entreprise', authEntreprise);

/***************************************************** */

app.use('/api/camion', addCamion );

app.use('/api/trajet' ,addTrajet);

/***************************************************** */

app.use('/api/accident', addAccident);

app.use('/api', scanQrCode);



const PORT = process.env.PORT || 8080;
app.listen( PORT , () => {
    console.log(`Server is running on port ${PORT}`);
});