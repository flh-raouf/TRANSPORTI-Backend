import express from 'express';
import { createQrCode } from '../Controllers/createQRcode.js';

const router = express.Router();

router.post('/qrcodegenerate', async (req, res) => {
    try {
        
        const { data } = req.body;

        if (!data) {
            return res.status(400).send('Data is required');
        }

        const qrCode = await createQrCode(data);
        res.status(201).send(qrCode);

    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

export default router;
