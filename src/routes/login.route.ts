import type{ Request, Response } from 'express';
import { ENV } from '../config/env.config.ts';
import express from 'express';
const router = express.Router();
import User from '../models/user.model.ts';
import type { UserType } from '../types/user.types.ts';
import bcrypt from 'bcryptjs';

router.post('', async (req: Request, res: Response) => {
    try{
        const { email, password } = req.body;
        const userExist = await User.findOne({email: email}).exec() as UserType
        if ( userExist === null ) {
            res.status(400).json({ message: `User is not register go to Register page ==>` });
        }
        else if( userExist.password === password ) {
            res.status(200).json({ userExist });
            console.log(`Welcome to APP`)
        }
        else if( userExist.password !== password ) {
            res.status(400).json({massage: `Email is correct but password is WRONG`});
            console.log(`Email is correct but password is WRONG`)
        }
        else{
            res.status(404).json({massage: `Something went WRONG`});
        }
    }
    catch (error) {
        res
            .status(500)
            .json({ message: `Something went wrong on Login page` });
    } 
});

export default router;