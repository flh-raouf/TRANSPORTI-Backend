import express from 'express';
import AddAccident from '../Controllers/addAccident.js';
import authenticateUser from '../Middleware/authMiddleware.js';

const router = express.Router();

router.post('/addAccident' , authenticateUser , AddAccident);

export default router;