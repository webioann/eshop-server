import type{ Request, Response } from 'express';
import { Types } from 'mongoose';
import express from 'express';
import Product from '../models/product.model.ts';
const router = express.Router();

router.put('', async (req: Request, res: Response) => {
    try{
        const { id } = req.params;
        const { name, description, price, stock, category } = req.body;
        const ProductForUpdate = await Product.findById(id);
        if (!ProductForUpdate) {
            return res.status(404).json({ message: "Product not found" });
            }
        if (name) ProductForUpdate.name = name;
        if (description) ProductForUpdate.description = description;
        if (price !== undefined) ProductForUpdate.price = parseFloat(price);
        if (stock !== undefined) ProductForUpdate.stock = parseInt(stock);
        if (category) ProductForUpdate.category = category;
        const updatedProduct = await ProductForUpdate.save();
        res.status(201).json(updatedProduct)
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
        console.error("Error in time updating product data:", error);
    }
});

export default router;