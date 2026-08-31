import express from 'express';
import authMiddleware from '../Middleware/authMiddleware.js';
import {
  addBLogToFavorite,
  getAllBlog,
  getDescription,
  removeBLogFromFavorite,
} from '../controller/blogController.js';

const router = express.Router();

router.get('/get-all-blogs', getAllBlog);
router.get('/description/:id', getDescription);

// Allow any authenticated user (regular user or admin) to manage their favourites
router.put('/FavoriteBlogs/:id', authMiddleware.verifyToken, addBLogToFavorite);
router.put('/remove-favorite/:id', authMiddleware.verifyToken, removeBLogFromFavorite);
router.put('/remove-favourite/:id', authMiddleware.verifyToken, removeBLogFromFavorite);

export default router;