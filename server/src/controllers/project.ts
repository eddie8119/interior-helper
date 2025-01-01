import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { AppDataSource } from '../config/database';
import { Project } from '../entities/Project';
import { UserRequest } from '../middleware/auth';

// 初始化 repository
const projectRepository = AppDataSource.getRepository(Project);


