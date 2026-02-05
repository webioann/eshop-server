import express from 'express';
const router = express.Router();
import { createProduct, updateProduct, deleteProduct } from '../controllers/admin.controller.ts';
import { getAllProducts } from '../controllers/product.controller.ts';

router.get("/products", getAllProducts)
router.post("/products", createProduct)
router.put("/products/:id", updateProduct)
router.delete("/products/:id", deleteProduct)

export default router;
