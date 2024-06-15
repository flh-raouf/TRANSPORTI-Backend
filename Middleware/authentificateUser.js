import jwt from 'jsonwebtoken';
import { UnauthenticatedError } from '../errors/index.js';

const authenticateUser = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        throw new UnauthenticatedError('Authentication invalid');
    }

    const token = authHeader.split(' ')[1];

    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET);
        // Attach the user information to the request object
        req.user = { barage_id: payload.barage_id };
        next();
    } catch (error) {
        throw new UnauthenticatedError('Authentication invalid');
    }
};

export default authenticateUser;
