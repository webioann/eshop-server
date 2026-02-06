import express from 'express';
const router = express.Router();
import { register, login, logout } from '../controllers/auth.controller.ts';
import verifyToken from '../middleware/verifyToken.ts';

router.post("/register", register)
router.post("/login", verifyToken, login)
router.post("/logout", verifyToken, logout)

export default router;
