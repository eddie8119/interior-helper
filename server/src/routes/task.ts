import { Router, Request, Response, NextFunction } from 'express';
import { TaskController } from '../controllers/task';
import { authMiddleware } from '../middleware/auth';
import { AuthRequest } from '../types/auth';

const router = Router();
const taskController = new TaskController();

router.use((req: Request, res: Response, next: NextFunction) => {
  return authMiddleware(req as AuthRequest, res, next);
});

router.get('/project/:projectId', taskController.getProjectTasks);
router.post('/project/:projectId', taskController.createTask);
router.get('/:id', taskController.getTask);
router.put('/:id', taskController.updateTask);
router.delete('/:id', taskController.deleteTask);

export default router;
