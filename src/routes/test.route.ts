import type{ Request, Response } from 'express';
import { ENV } from '../config/env.config.ts';
import express from 'express';
const router = express.Router();
import Test from '../models/test.model.ts';
import type { TestDataType } from '../types/mongodb.types.ts';

router.post('', async (req: Request, res: Response) => {
    try{
        const { data, message } = req.body;
        const newTest = new Test({ data, message });
        await newTest.save();
        res.status(201).json({ message: `Test data saved successfully` });
    }
    catch (error) {
        res
            .status(500)
            .json({ message: `Something went wrong on Login page` });
    } 
});

export default router;