import express from 'express'
import authMiddleware from '../Middleware/authMiddleware.js'

import { addBLogToFavorite, getAllBlog, getDescription, removeBLogFromFavorite } from '../controller/blogController.js'


const router = express.Router();

router.get('/get-all-blogs', getAllBlog);
router.get('/description/:id', getDescription);
router.put('/FavoriteBlogs/:id',authMiddleware.verifyToken,authMiddleware.authorizeRole("user"), addBLogToFavorite);
router.put('/remove-favorite/:id',authMiddleware.verifyToken,authMiddleware.authorizeRole("user"), removeBLogFromFavorite);

export default router