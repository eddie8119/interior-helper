import express from 'express';
import { register } from '../controllers/authController';

const router = express.Router();

router.post('/users/login', (req, res) => {});

router.get('/users/register', register);

router.get('/users/logout', (req, res) => {});

export default router;
