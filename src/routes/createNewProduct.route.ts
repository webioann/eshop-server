import type{ Request, Response } from 'express';
import { Types } from 'mongoose';
import express from 'express';
import Product from '../models/product.model.ts';
const router = express.Router();

router.post('', async (req: Request, res: Response) => {
    try{
        const { name, description, price, stock, category } = req.body;
        if (!name || !description || !price || !stock || !category) {
            return res.status(400).json({ message: "All fields are required" });
        }
        // ========================================================
        // =========================================================
        // in this place use MULTER middleware for getting images URLs
        const defaultImages = [
            "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=500",
            "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=500"
        ]
        const newProduct = await Product.create({
            name,
            description,
            price: parseFloat(price),
            stock: parseInt(stock),
            category,
            images: defaultImages,
        });
        res.status(201).json(newProduct);
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
        console.error("Error in time creating new product:", error);
    }
});

export default router;