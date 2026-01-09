import type{ Request, Response } from 'express';
import { ENV } from '../config/env.config.ts';
import express from 'express';
const router = express.Router();
import User from '../models/user.model.ts';
import bcrypt from 'bcryptjs';

router.post('', async (req: Request, res: Response) => {
    try{
        const { username, email, password } = req.body;
        // const hashedPassword = bcrypt.hash(password, 10)
        // check if User exists on Mongodb > eshop-db > users 
        const ifUserExist = await User.findOne({username: username}).exec();
        if( ifUserExist === null ) {
            const newUser = new User({
                username,
                email, 
                password,
                createdAt: new Date(),
                updatedAt : null
            })
            await newUser.save();
            res.status(201).json({ message: `User ${username} created successfully` });
        }
        else {
            res.status(400).json({ message: `User with this name ${username} already exist` });
        }
    }
    catch (error) {
        res
            .status(500)
            .json({ message: `Something went wrong on Register page !!!` });
    } 
});

export default router;