import type{ Request, Response, NextFunction} from 'express';
import { ENV } from '../config/env.ts';
import express from 'express';
const router = express.Router();
import { protectRoute } from '../middleware/protectRoute.middleware.ts';


router.get('/', (req: Request, res: Response, next: NextFunction) => {
    try{
        res.status(200).json({ message: `Home page` });
    } catch (err) { next(err) };
});
// TEST ROUTE ==============
router.get('/test', protectRoute, (req: Request, res: Response, next: NextFunction) => {
    try{
        res.status(200).json({ message: `Test page` });
    } catch (err) { next(err) };
});


export default router;
