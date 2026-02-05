import type{ Request, Response } from 'express';
import config  from '../config/env.ts';
import express from 'express';
const router = express.Router();
import User from '../models/user.model.ts';
import type { UserType } from '@shared-types/user.types.ts';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

router.post('', async (req: Request, res: Response) => {
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
});

export default router;