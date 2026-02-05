import type{ Request, Response } from 'express';
import User from '../models/user.model.ts';
import bcrypt from 'bcryptjs';
import config  from '../config/env.ts';
import type { UserType } from '@shared-types/user.types.ts';
import jwt from 'jsonwebtoken';

export const register =  async (req: Request, res: Response): Promise<void> => {
    try{
        const { username, email, password, role } = req.body;
        const user = await User.findOne({username}).exec();
        const hashedPassword = await bcrypt.hash(password, 10)
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
        // User already exists
        if(user !== null) {
            const decryptedPassword = await bcrypt.compare(user.password, hashedPassword)
            if( user.email === email && decryptedPassword ) {
                res.status(200).json({ message: `User ${username} welcome back` });
            }
            // if password is not correct
            if( user.email === email && user.password !== hashedPassword ) {
                res.status(203).json({ message: `User with email: ${email} already exists, but password is wrong - enter correct password` });
            }
        }
    }
    catch (error) {
        res
            .status(500)
            .json({ message: `Something went wrong on Register page !!!` });
    } 
};

export const login =  async (req: Request, res: Response) => {
    try{
        const { email, password } = req.body;
        const user = await User.findOne({email}).exec() as UserType
        if ( user === null ) {
            return res.status(400).json({ message: `User is not register go to Register page ==>` });
        }
        else {
            const passwordIsCorrect = await bcrypt.compare(password, user.password)
            if( passwordIsCorrect ) {
                const token = jwt.sign(
                    { id: user._id }
                    , config.JWT_ACCESS_SECRET,
                    { expiresIn: "1h" }
                )
                return res.status(200).json({ token });
            }
            else {
                return res.status(400).json({massage: `Email is correct but password is WRONG`});
            }
        }
    }
    catch (error) {
        res
            .status(500)
            .json({ message: `Something went wrong on Login page` });
    } 
};