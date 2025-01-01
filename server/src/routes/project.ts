import express from 'express';
import {

} from '../controllers/project';
import { verifyToken } from '../middleware/auth';

const router = express.Router();

// Public routes
router.post('/register', );


// Protected routes
router.use(verifyToken); 


export default router;
