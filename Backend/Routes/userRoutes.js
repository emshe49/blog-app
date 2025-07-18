import express from 'express';
import { registerUser, loginUser, getUserData, chekCookie, logoutUser, changePassword, changeAvatar ,googleAuth , googleAuthCallback } from '../controller/userController.js';
import authMiddleware from '../Middleware/authMiddleware.js';
import { upload } from '../Middleware/multer.js';


const router = express.Router();

router.post('/signup', registerUser);
router.post('/login', loginUser);
router.get('/userData', authMiddleware.verifyToken, authMiddleware.authorizeRole('user'), getUserData);
router.get('/check-cookie', chekCookie);
router.post('/logout', logoutUser);
router.patch('/change-password', authMiddleware.verifyToken, authMiddleware.authorizeRole('user'), changePassword);
router.put('/change-avatar', 
    authMiddleware.verifyToken,
    authMiddleware.authorizeRole('user'),
    upload.single("image"), // Make sure this matches the key used in FormData
    changeAvatar
);
router.get('/auth/google', googleAuth);
router.get('/auth/google/callback', googleAuthCallback)
export default router;