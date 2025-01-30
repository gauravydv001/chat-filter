import express, { Request, Response } from 'express';
import { register, login, validateToken } from '../controllers/auth.controller';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/validate', validateToken);

export default router;