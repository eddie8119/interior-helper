import { Router } from 'express';
import { ProjectController } from '../controllers/project';
import { authMiddleware } from '../middleware/auth';

const router = Router();
const projectController = new ProjectController();

router.use(authMiddleware);
router.get('/', projectController.getAllProjects);
router.post('/', projectController.createProject);
router.get('/:id', projectController.getProjectById);
router.put('/:id', projectController.updateProject);
router.delete('/:id', projectController.deleteProject);

export default router;
