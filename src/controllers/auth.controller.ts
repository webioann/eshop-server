import type{ Request, Response, CookieOptions } from 'express';
import User from '../models/user.model.ts';
import Token from '../models/token.model.ts';
import bcrypt from 'bcryptjs';
import config  from '../config/env.ts';
import type { UserType } from '@shared-types/user.types.ts';
import jwt from 'jsonwebtoken';

const cookieOptions: CookieOptions = {
    httpOnly: true,
    secure: config.NODE_ENV === "production",
    sameSite: "strict"
}

const authorizationProcess = async (req: Request, res: Response): Promise<void> => {

};

export const register =  async (req: Request, res: Response): Promise<void> => {
    try{
        const { username, email, password, role } = req.body;
        const user = await User.findOne({email}).exec();
        const hashedPassword = await bcrypt.hash(password, 10)
        //  if USER do not exists yet
        if( user === null ) {
            const newUser = new User({
                username,
                email, 
                password: hashedPassword,
                role: role,
                createdAt: new Date(),
            })
            // test commit
            await newUser.save();
            res.status(201).json({ message: `User ${username} created successfully` });
        }
        // if USER already exists --> LOGIN logic --> LOGIN logic =======
        if(user !== null) {
            const passwordIsCorrect = await bcrypt.compare(password, user.password)
            if( passwordIsCorrect ) {
                const payload = {
                    userId: user._id,
                    username: user.username,
                    email: user.email,
                    role: user.role
                }
                const accessToken = jwt.sign(payload, config.JWT_ACCESS_SECRET, { expiresIn: "1h" })
                const refreshToken = jwt.sign(payload, config.JWT_ACCESS_SECRET, { expiresIn: "1h" })
                res.cookie("refreshToken", refreshToken, cookieOptions)
                res.status(200).json({ 
                    token: accessToken,
                    message: "Login successful" ,
                    user: {
                        userId: user._id,
                        username: user.username,
                        email: user.email,
                        imageUrl: user.imageUrl,
                        role: user.role
                    }
                });
            }
            // if password is not correct
            if( !passwordIsCorrect ) {
                res.status(401).json({ message: "Enter correct password" });
            }
        }
    }
    catch (error) {
        res
            .status(500)
            .json({ message: "Something went wrong on Register controller" });
    } 
};

export const login =  async (req: Request, res: Response): Promise<void> => {
    try{
        const { email, password } = req.body;
        const user = await User.findOne({email}).exec() as UserType
        if ( user === null ) {
            res.status(404).json({ message: "User is not found - go to Register" });
        }
        if ( user !== null ) {
            const passwordIsCorrect = await bcrypt.compare(password, user.password)
            if( passwordIsCorrect ) {
                const payload = {
                    userId: user._id,
                    username: user.username,
                    email: user.email,
                    role: user.role
                }
                const accessToken = jwt.sign(payload, config.JWT_ACCESS_SECRET, { expiresIn: "1h" })
                const refreshToken = jwt.sign(payload, config.JWT_ACCESS_SECRET, { expiresIn: "1h" })
                res.cookie("refreshToken", refreshToken, cookieOptions)
                res.status(200).json({ 
                    token: accessToken,
                    message: "Login successful" ,
                    user: {
                        userId: user._id,
                        username: user.username,
                        email: user.email,
                        imageUrl: user.imageUrl,
                        role: user.role
                    }
                });
            }
            // if password is not correct
            if( !passwordIsCorrect ) {
                res.status(401).json({ message: "Enter correct password" });
            }
        }
    }
    catch (error) {
        res
            .status(500)
            .json({ message: "Something went wrong on Login controller" });
    } 
};

export const logout = async (req: Request, res: Response): Promise<void> => {
    try{
        const refreshToken = req.cookies.refreshToken as string
        if( refreshToken ) {
            await Token.deleteOne({ token: refreshToken })
        }
        res.clearCookie("refreshToken", cookieOptions)
        res.status(204).json({message: "Logout is successful"})
    } catch (error) {
        res
            .status(500)
            .json({ message: "Something went wrong in time Logout"});
    } 
};
