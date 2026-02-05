import type{ Request, Response } from 'express';
import express from 'express';
import Product from '../models/product.model.ts';
const router = express.Router();

router.get('', async (req: Request, res: Response) => {
    try{
        // most recent products first ( -1 )
        // if need use search params
        const products = await Product.find().sort({ createdAt: -1 });
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
        console.error("Error fetching products:", error);
    }

});

export default router;