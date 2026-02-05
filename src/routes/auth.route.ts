import express from 'express';
import register from '../controllers/register.controller.ts';
import login from '../controllers/login.controller.ts'

const router = express.Router();

router.post('/register', register);
router.post('/login', login);

export default router;