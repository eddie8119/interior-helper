import { Router, Request, Response, NextFunction } from 'express';
import { UserController } from '../controllers/user';
import { authMiddleware } from '../middleware/auth';
import { AuthRequest } from '../types/auth';

const router = Router();
const userController = new UserController();

// 公開路由
router.post('/register', userController.register);
router.post('/login', userController.login);

// 需要認證的路由
router.use((req: Request, res: Response, next: NextFunction) => {
  return authMiddleware(req as AuthRequest, res, next);
});

router.post('/logout', userController.logout);
router.get('/me', userController.getCurrentUser);
router.put('/me', userController.updateUserData);
router.delete('/me', userController.deleteUser);

export default router;
