import express from 'express';
import authMiddleware from '../Middleware/authMiddleware.js';
import { upload } from '../Middleware/multer.js';
import { loginAdmin, addBlog, adminLogout , updateBlog ,deleteBlog,adminAdd} from '../controller/adminController.js';

const router = express.Router();

router.post('/login', loginAdmin);
router.post('/addBlog', authMiddleware.verifyToken, authMiddleware.authorizeRole("admin"), upload.single("image"), addBlog);
// router.post('/add-category', authMiddleware.verifyToken, authMiddleware.authorizeRole("admin"), addCategory);
router.post('/adminLogout', adminLogout)
router.put('/update-blog/:id',authMiddleware.verifyToken,authMiddleware.authorizeRole("admin"), updateBlog);

router.delete('/delete-blog/:id',authMiddleware.verifyToken,authMiddleware.authorizeRole("admin"), deleteBlog);
router.post('/add-admin', authMiddleware.verifyToken, authMiddleware.authorizeRole("admin"),adminAdd);
export default router;