import express from 'express';
import QrCodegenerate from './Routes/QRcodeRoute.js';
 import camionRoute from './Routes/camionRoute.js';
const app = express();

app.use(express.json());

app.use('/api/qrcode',QrCodegenerate);

app.use('/api', camionRoute )

app.listen(8080, () => {
    console.log('Server is running on port 8080');
});