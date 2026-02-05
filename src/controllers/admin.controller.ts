import type{ Request, Response } from 'express';
import Product from '../models/product.model.ts';

// /admin/products
export const createProduct  =  async (req: Request, res: Response) => {
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
};
// /admin/products/:id
export const updateProduct = async (req: Request, res: Response) => {
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

};
// admin/products/:id
export const deleteProduct =  async (req: Request, res: Response) => {
    try{
        const productId = req.params.id;
        const product = await Product.findById(productId)
        console.log(product, req.params.id);
        if (!product) {
            res.status(404).json({ message: "Product with this ID not found" });
        }
        // REMOVE IMAGES FROM CLOUDINARY ------------------
        // if ( product ) {
        //     const deletePromises = product.images.map((imageUrl) => {
        //         // Extract public_id from URL (assumes format: .../products/publicId.ext)
        //         const publicId = "products/" + imageUrl.split("/products/")[1]?.split(".")[0];
        //         if (publicId) return cloudinary.uploader.destroy(publicId);
        //     });
        //     await Promise.all(deletePromises.filter(Boolean));
        // }
        await Product.findByIdAndDelete(productId);
        res.status(200).json({ message: "Product deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
        console.error("Error deleting product", error);
    }
};
