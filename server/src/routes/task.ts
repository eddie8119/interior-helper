import { Router } from 'express';
import { TaskController } from '../controllers/task';
import { authMiddleware } from '../middleware/auth';

const router = Router();
const taskController = new TaskController();

// 所有任務路由都需要認證
router.use(authMiddleware);

// 任務路由
router.get('/project/:projectId', taskController.getProjectTasks);
router.post('/project/:projectId', taskController.createTask);
router.get('/:id', taskController.getTaskById);
router.put('/:id', taskController.updateTask);
router.delete('/:id', taskController.deleteTask);

export default router;
