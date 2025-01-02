import { Router } from 'express';
import { UserController } from '../controllers/user';
import { authMiddleware } from '../middleware/auth';

const router = Router();
const userController = new UserController();

router.post('/register', userController.register);
router.post('/login', userController.login);

router.use(authMiddleware);
router.post('/logout', userController.logout);
router.get('/me', userController.getCurrentUser);
router.put('/me', userController.updateUser);
router.delete('/me', userController.deleteUser);

export default router;
