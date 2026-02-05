import type{ Request, Response } from 'express';
import Product from '../models/product.model.ts';

export const getAllProducts = async (req: Request, res: Response): Promise<void> => {
    try{
        // most recent products first ( -1 )
        // if need use search params
        const products = await Product.find().sort({ createdAt: -1 });
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
        console.error("Error fetching products:", error);
    }
};

export const getProductById = async (req: Request, res: Response): Promise<void> => {
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
};