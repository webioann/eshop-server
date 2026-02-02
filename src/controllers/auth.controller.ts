import type { Request, Response } from 'express';
import User from '../models/user.model.ts';
import type { UserType } from '@shared-types/user.types.ts';
import bcrypt from 'bcryptjs';
import { generateUsername } from '../utils/generateUsername.ts';
import { createAccessToken, createRefreshToken } from '../config/jwt.ts';
import config from '../config/env.ts';

type MainUserDataType = Pick<UserType, "email" | "password" | "role">

const register = async (req: Request, res: Response): Promise<void> => {
    try{
        const { email, password, role } = req.body as MainUserDataType;
        // generate User name in time "development" mode only
        const username = generateUsername();
        const hashedPassword = await bcrypt.hash(password, 10)
        
        const newUser = await User.create({
            username,
            email, 
            password: hashedPassword,
            role
        })
        const accessToken = createAccessToken(newUser._id);
        const refreshToken = createRefreshToken(newUser._id);
        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: config.NODE_ENV === "production",
            sameSite: "strict"
        })

        res.status(201).json({
            message: "User created successfully" ,
            user: {
                username: newUser.username,
                email: newUser.email,
                role: newUser.role,
            },
            accessToken
        });
    }
    catch (error) {
        res
            .status(500)
            .json({
                message: "Error during registration",
                code: "ServerError",
                error,
            });
    } 

};

export default register;