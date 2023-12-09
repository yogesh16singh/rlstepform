import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
const JWT_SECRET = 'levitation'; // Replace this with your secret key

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const token = req.header('Authorization');

    if (!token) {
        return res.status(401).json({ error: 'Access denied' });
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.body.userId = (decoded as any).userId; // Add userId to request body for further processing
        next();
    } catch (error) {
        res.status(401).json({ error: 'Invalid token' });
    }
};

export default authMiddleware;
