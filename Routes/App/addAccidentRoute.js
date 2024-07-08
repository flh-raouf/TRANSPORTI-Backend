import express from 'express';
import AddAccident from '../../Controllers/App/addAccident.js';
import authenticateUser from '../../Middleware/authMiddleware.js';
import { validateRequest ,validateAddAccident } from '../../Middleware/validationMiddleware.js';

const router = express.Router();

router.post('/addAccident' ,validateRequest(validateAddAccident)/*, authenticateUser*/ , AddAccident);

export default router;