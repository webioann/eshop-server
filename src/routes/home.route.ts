import type{ Request, Response } from 'express';
import { ENV } from '../config/env.config.ts';
import express from 'express';
const router = express.Router();

router.get('', (req: Request, res: Response) => {
    res.status(200).json({ message: `Home page` });
});

export default router;