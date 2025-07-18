import express from 'express';
import authMiddleware from '../Middleware/authMiddleware.js';
import { addCategory, categoryById, deleteCategory, getCategory, updateCategory } from '../controller/categoryController.js';


const router = express.Router();

router.post('/add-category', authMiddleware.verifyToken, authMiddleware.authorizeRole("admin"), addCategory);
router.get('/get-category', getCategory);
router.get('/get-category/:id', categoryById);
router.put('/update-category/:id',authMiddleware.verifyToken,authMiddleware.authorizeRole("admin"), updateCategory);
router.delete('/delete-category/:id',authMiddleware.verifyToken,authMiddleware.authorizeRole("admin"), deleteCategory);

export default router;