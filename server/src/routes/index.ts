import { Router } from 'express';
import userRoutes from './user';
import projectRoutes from './project';

const router = Router();

// API 路由
router.use('/api/user', userRoutes);       
router.use('/api/projects', projectRoutes);  

// 404 處理
router.use('*', (req, res) => {
  res.status(404).json({ message: '找不到該路由' });
});

export default router;
