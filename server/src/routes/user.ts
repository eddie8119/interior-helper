import express from 'express';
import {
  register,
  login,
  logout,
  getCurrentUser,
  updateCurrentUser,
  updatePassword,
} from '../controllers/user';
import { verifyToken } from '../middleware/auth';

const router = express.Router();

// Public routes
router.post('/register', register);
router.post('/login', login);

// Protected routes
router.use(verifyToken); // 應用身份驗證中間件到以下所有路由
router.post('/logout', logout);
router.get('/me', getCurrentUser);
router.put('/me', updateCurrentUser);
router.put('/password', updatePassword);

export default router;
