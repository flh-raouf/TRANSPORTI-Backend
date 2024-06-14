import pool from '../DB/connect.js';
import QRCode from 'qrcode';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
const __dirname = path.dirname(fileURLToPath(import.meta.url));


const generateCodeQr = 
    async (req, res) => {
        try {
            
            const { data } = req.body;
    
            if (!data) {
                return res.status(400).send('Data is required');
            }
    
            const qrCodeUrl = await QRCode.toDataURL(data);
            const [result] = await pool.query(`INSERT INTO qr_code (qrcode_img) VALUES (?)`, [qrCodeUrl]);
            const id = result.insertId;
    
            const qrCodePath = path.join(__dirname, '../qrcodes', `Qrcode${id}.png`);
            fs.mkdirSync(path.dirname(qrCodePath), { recursive: true });
            await QRCode.toFile(qrCodePath, data);
    
            const [rows] = await pool.query(`SELECT * FROM qr_code WHERE qrcode_id = ?`, [id]);
            
            res.status(201).send(rows[0]);
    
        } catch (error) {
            console.error(error);
            res.status(500).send('Internal Server Error');
        
    }
    
}

export default generateCodeQr;