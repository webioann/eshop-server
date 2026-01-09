import type{ Request, Response } from 'express';
import { ENV } from '../config/env.config.ts';
import express from 'express';
const router = express.Router();
import User from '../models/user.model.ts';

router.get('', (req: Request, res: Response) => {
    res.status(200).json({ message: `Register page` });
});

export default router;