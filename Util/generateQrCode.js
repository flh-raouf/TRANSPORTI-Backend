import pool from '../DB/connect.js';
import QRCode from 'qrcode';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const generateCodeQr = async (data) => {
    try {
        if (!data) {
            throw new Error('Data is required');
        }

        const qrCodeUrl = await QRCode.toDataURL(data);
        const [result] = await pool.query(`INSERT INTO qr_code (qrcode_img, camion_id) VALUES (?, ?)`, [qrCodeUrl, data]);
        const id = result.insertId;

        const qrCodePath = path.join(__dirname, '../Img/qrcodes', `Qrcode${id}.png`);
        fs.mkdirSync(path.dirname(qrCodePath), { recursive: true });
        await QRCode.toFile(qrCodePath, data);

        const [rows] = await pool.query(`SELECT * FROM qr_code WHERE qrcode_id = ?`, [id]);

        return rows[0]; // Return the inserted row from qr_code table
    } catch (error) {
        console.error(error);
        throw error; // Throw the error so it can be handled by the caller (AddCamion controller)
    }
}

export default generateCodeQr;
