import { Router } from 'express';
import userRoutes from './userRoutes';

const router = Router();

router.use('/api/user', userRoutes);

// 處理 404 路由
router.use('*', (req, res) => {
  res.status(404).json({ message: '找不到該路由' });
});

export default router;