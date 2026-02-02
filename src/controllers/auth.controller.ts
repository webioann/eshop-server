import type { Request, Response } from 'express';
import User from '../models/user.model.ts';
import type { UserType } from '@shared-types/user.types.ts';
import bcrypt from 'bcryptjs';
import { generateUsername } from '../utils/generateUsername.ts';


type MainUserDataType = Pick<UserType, "email" | "password" | "role">

const register = async (req: Request, res: Response): Promise<void> => {
    try{
        const { email, password, role } = req.body as MainUserDataType;
        const username = generateUsername();
        const user = await User.findOne({username}).exec();
        const hashedPassword = await bcrypt.hash(password, 10)
        if( user === null ) {
            const newUser = new User({
                username,
                email, 
                password,
                role,
                createdAt: new Date(),
            })
            // test commit
            await newUser.save();
            res.status(201).json({ message: `User ${username} created SUCCessfully` });
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
            .json({
                message: "Error during registration",
                code: "ServerError",
                error
            });
    } 

};

export default register;