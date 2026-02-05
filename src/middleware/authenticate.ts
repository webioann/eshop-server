import type { Response, Request, NextFunction } from "express";
import { fakeAuth } from "../utils/fakeAuth.ts";
import User from "../models/user.model.ts";
import Token from '../models/token.model.ts';
import bcrypt from 'bcryptjs';
import config  from '../config/env.ts';
import type { UserType } from '@shared-types/user.types.ts';
import jwt from 'jsonwebtoken';


export const authenticate = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const authHeader = req.headers.authorization;
    if (!authHeader?.startsWith("Bearer ")) {
        res.status(401).json({
            code: "AuthenticationError",
            message: "Access denied - no token"
        });
        return;
    }
    const token = authHeader && authHeader.replace(/^Bearer\s+/, '');
    try{

    } catch (error) {
        console.error("Error in protectRoute middleware", error)
        res.status(500).json({ message: "Internal server error" })
    }
}