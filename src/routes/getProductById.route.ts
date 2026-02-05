import type{ Request, Response } from 'express';
import { Types } from 'mongoose';
import express from 'express';
import Product from '../models/product.model.ts';
const router = express.Router();

router.get('/:id', async (req: Request, res: Response) => {
    try{
        const { id } = req.params;
        const product = await Product.findById(id);
        if (!product) {
            res.status(404).json({ message: "Product with this ID not found" });
        }
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
        console.error("Error fetching product by ID:", error);
    }
});

export default router;