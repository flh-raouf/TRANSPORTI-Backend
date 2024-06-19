import express from 'express';
import AddTrajet from '../Controllers/addTrajet.js';
import authenticateUser from '../Middleware/authMiddleware.js';

const router = express.Router();

router.post('/addTrajet' , authenticateUser , AddTrajet);

export default router;