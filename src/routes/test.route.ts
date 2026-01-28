import type{ Request, Response, NextFunction } from 'express';
import { ENV } from '../config/env.ts';
import express from 'express';
const router = express.Router();
import Test from '../models/test.model.ts';
import type { TestDataType } from '../types/mongodb.types.ts';
import { CustomErrorHandler } from '../middleware/error.middleware.ts';

router.get('/', async (req: Request, res: Response, next: NextFunction) => {
    const user  = null;
    try{
        // const { data, message } = req.body;
        // const newTest = new Test({ data, message });
        // await newTest.save();
        
        if(user === null) {
            throw new CustomErrorHandler(300, "hello ==> ERRORrrrrrrrrrrrrr")
            next()
        }
        // res.status(201).json({ message: `Test data saved successfully` });
    }
    catch (error) {
        next(error)
        // res
        //     .status(500)
        //     .json({ message: `Something went wrong on Login page` });
    } 
});
router.get('/', async(req: Request, res: Response, next: NextFunction) => { 
    try{
        next('SUPER ERROR')
    }catch (err) { next(err) }
})

export default router;