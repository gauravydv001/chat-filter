import express from 'express';
import { searchMessages } from '../controllers/message.controller';
import authMiddleware from '../middleware/auth.middleware';

const router = express.Router();

router.get('/search', authMiddleware, searchMessages);

export default router;