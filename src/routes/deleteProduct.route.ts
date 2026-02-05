import type{ Request, Response } from 'express';
import { Types, ObjectId } from 'mongoose';
import express from 'express';
import Product from '../models/product.model.ts';
const router = express.Router();

router.delete('/:id', async (req: Request, res: Response) => {
    try{
        const product = await Product.findById(req.params.id);
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
        await Product.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Product deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
        console.error("Error deleting product", error);
    }
});
export default router;