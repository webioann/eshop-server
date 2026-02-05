import express from 'express';
const router = express.Router();
import { register, login, logout } from '../controllers/auth.controller.ts';
import { authenticate } from '../middleware/authenticate.ts';

router.post("/register", register)
router.post("/login", login)
router.post("/logout", authenticate, logout)

export default router;
