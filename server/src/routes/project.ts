import express from 'express';
import {
  getProjects,
  getProject,
  createProject,
  updateProject,
  deleteProject,
  updateProjectProgress
} from '../controllers/project';
import { verifyToken } from '../middleware/auth';

const router = express.Router();

router.use(verifyToken); 
router.get('/', getProjects);
router.get('/:id', getProject);
router.post('/', createProject);
router.put('/:id', updateProject);
router.delete('/:id', deleteProject);
router.patch('/:id/progress', updateProjectProgress);

export default router;


