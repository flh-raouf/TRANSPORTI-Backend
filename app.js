import express from 'express';
import QrCodegenerate from './Routes/QRcodeRoute.js';

const app = express();

app.use(express.json());
app.use(QrCodegenerate);

app.listen(8080, () => {
    console.log('Server is running on port 8080');
});