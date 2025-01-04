import { Router, Request, Response, NextFunction } from 'express';
import { ProjectController } from '../controllers/project';
import { authMiddleware } from '../middleware/auth';
import { AuthRequest } from '../types/auth';

const router = Router();
const projectController = new ProjectController();

router.use((req: Request, res: Response, next: NextFunction) => {
  return authMiddleware(req as AuthRequest, res, next);
});

router.get('/', projectController.getAllProjects);
router.post('/', projectController.createProject);
router.get('/:id', projectController.getProjectById);
router.put('/:id', projectController.updateProject);
router.delete('/:id', projectController.deleteProject);

export default router;
