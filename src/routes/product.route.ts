import express from 'express';
const router = express.Router();
import { getAllProducts, getProductById } from '../controllers/product.controller.ts';

router.get("/products", getAllProducts)
router.get("/products/:id", getProductById)

export default router;
