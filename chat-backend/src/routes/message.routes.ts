import express from 'express';
import { searchMessages } from '../controllers/message.controller';
import authMiddleware from '../middleware/auth.middleware';

const router = express.Router();

// Use the authMiddleware and searchMessages controller
router.get('/search', authMiddleware, (req, res, next) => {
  searchMessages(req, res, next).catch(next); // Ensure errors are passed to the error handler
});

export default router;