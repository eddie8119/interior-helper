import { Router } from 'express';
import userRoutes from './user';
import projectRoutes from './project';
import taskRoutes from './task';

const router = Router();

// 健康檢查路由
router.get('/health', (_req, res) => {
  res.json({ status: 'ok' });
});

// API 路由
router.use('/users', userRoutes);
router.use('/projects', projectRoutes);
router.use('/tasks', taskRoutes);

// 404 處理
router.use('*', (req, res) => {
  res.status(404).json({ message: '找不到該路由' });
});

export default router;
