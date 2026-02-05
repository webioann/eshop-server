import type { Request, Response } from 'express';
import User from '../models/user.model.ts';
import Token from '../models/token.model.ts';
import type { UserType } from '@shared-types/user.types.ts';
import bcrypt from 'bcryptjs';
import { generateUsername } from '../utils/generateUsername.ts';
import { createAccessToken, createRefreshToken } from '../config/jwt.ts';
import config from '../config/env.ts';

type loginRequestBody = Pick<UserType, "email" | "password">

const login = async (req: Request, res: Response): Promise<void> => {
    try{
        const { email, password } = req.body;
        const user = await User.findOne({email}).exec()
        if ( user === null ) {
            res.status(404).json({
                code: "NotFound",
                message: "User not found" 
            });
            return;
        }
        const accessToken = createAccessToken(user._id);
        const refreshToken = createRefreshToken(user._id);
        // save refresh token to MongoDB ===
        await Token.create({
            token: refreshToken,
            userId: user._id
        })
        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: config.NODE_ENV === "production",
            sameSite: "strict"
        })

        res.status(201).json({
            message: "User created successfully" ,
            user: {
                username: user.username,
                email: user.email,
                role: user.role,
            },
            accessToken
        });
    }
    catch (error) {
        res
            .status(500)
            .json({ message: `Something went wrong on Login page` });
    } 

};

export default login;