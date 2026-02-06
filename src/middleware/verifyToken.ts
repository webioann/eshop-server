import type { Response, Request, NextFunction } from "express";
import config from "../config/env.ts";
import jwt from 'jsonwebtoken';

// Middleware to verify the JWT tokens
const verifyToken = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    // Get token from the Authorization header
    // The header format is typically "Authorization": "Bearer <token>"
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) {
        res.status(401).send({message: "Unauthorized. No token provided"}); // Forbidden
    }
    else {
        try {
            const decoded = jwt.verify(token, config.JWT_ACCESS_SECRET);
            req.user = decoded;
            next();
        } catch (err) {
            // If verification fails (e.g., invalid signature, expired token)
            res.status(403).send({message: "Forbidden - Invalid or expired token"}); // Unauthorized
        }
    }
};

export default verifyToken;
