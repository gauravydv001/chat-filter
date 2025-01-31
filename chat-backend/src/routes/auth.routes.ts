import express from 'express';
import { register, login, validateToken } from '../controllers/auth.controller';

const router = express.Router();

router.post('/register', (req, res) => register(req, res));
router.post('/login', (req, res) => login(req, res));
router.get('/validate', (req, res) => validateToken(req, res));

export default router;