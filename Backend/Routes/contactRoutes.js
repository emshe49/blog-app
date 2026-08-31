import express from 'express';
import {
  sendMessage,
  getMessages,
  replyMessage,
  deleteMessage,
} from '../controller/contactController.js';
import authMiddleware from '../Middleware/authMiddleware.js';

const router = express.Router();

// Public route to submit inquiry
router.post('/send', sendMessage);

// Admin-only management routes
router.get(
  '/messages',
  authMiddleware.verifyToken,
  authMiddleware.authorizeRole('admin'),
  getMessages
);

router.put(
  '/reply/:id',
  authMiddleware.verifyToken,
  authMiddleware.authorizeRole('admin'),
  replyMessage
);

router.delete(
  '/message/:id',
  authMiddleware.verifyToken,
  authMiddleware.authorizeRole('admin'),
  deleteMessage
);

export default router;
