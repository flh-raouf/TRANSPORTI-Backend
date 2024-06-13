const express = require('express');
const QRCode = require('qrcode');
const path = require('path');
const fs = require('fs');

const app = express();
const port = 8000;

// Middleware to parse JSON bodies
app.use(express.json());

// Endpoint to generate QR code and save it as an image
app.post('/generate', async (req, res) => {
  const { data, filename } = req.body;

  if (!data) {
    return res.status(400).json({ error: 'No data provided' });
  }

  if (!filename) {
    return res.status(400).json({ error: 'No filename provided' });
  }

  try {
    const filePath = path.join(__dirname, 'qrcodes', `${filename}.png`);

    // Ensure the directory exists
    fs.mkdirSync(path.dirname(filePath), { recursive: true });

    // Generate QR code and save it as a file
    await QRCode.toFile(filePath, data);

    res.json({ message: 'QR code saved', filePath });
  } catch (error) {
    res.status(500).json({ error: 'Failed to generate and save QR code' });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
