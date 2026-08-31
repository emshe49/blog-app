import express from 'express';
import {
  registerUser,
  loginUser,
  getUserData,
  chekCookie,
  logoutUser,
  changePassword,
  changeAvatar,
  getAllUser,
} from '../controller/userController.js';
import authMiddleware from '../Middleware/authMiddleware.js';
import { upload } from '../Middleware/multer.js';

const router = express.Router();

router.post('/signup', registerUser);
router.post('/login', loginUser);
router.get('/userData', authMiddleware.verifyToken, getUserData);
router.get('/check-cookie', chekCookie);
router.post('/logout', logoutUser);
router.patch('/change-password', authMiddleware.verifyToken, changePassword);
router.put(
  '/change-avatar',
  authMiddleware.verifyToken,
  upload.single('image'),
  changeAvatar
);

router.get(
  '/get-all-users',
  authMiddleware.verifyToken,
  authMiddleware.authorizeRole('admin'),
  getAllUser
);

export default router;