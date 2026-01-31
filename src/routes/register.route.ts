import type{ Request, Response } from 'express';
import { ENV } from '../config/env.ts';
import express from 'express';
import User from '../models/user.model.ts';
import bcrypt from 'bcryptjs';

const router = express.Router();

router.post('/', async (req: Request, res: Response) => {
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
            await newUser.save();
            res.status(201).json({ message: `User ${username} created successfully` });
        }
        // User already exists
        if(user !== null) {
            if( user.email === email && user.password === hashedPassword ) {
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
});

export default router;