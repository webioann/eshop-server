import jwt from "jsonwebtoken";
import config from '../config/env.ts'
import { Types } from "mongoose";

export const createAccessToken = (userId: Types.ObjectId): string => {
    return jwt.sign({ userId }, config.JWT_ACCESS_SECRET, {
        expiresIn: config.ACCESS_TOKEN_EXPIRY,
        subject: "accessApi"
    })
};

export const createRefreshToken = (userId: Types.ObjectId): string => {
    return jwt.sign({ userId }, config.JWT_REFRESH_SECRET, {
        expiresIn: config.REFRESH_TOKEN_EXPIRY,
        subject: "refreshToken"
    })
};