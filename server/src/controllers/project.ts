import { Request, Response } from 'express';
import { AppDataSource } from '../config/database';
import { Project } from '../entities/Project';
import { UserRequest } from '../middleware/auth';

const projectRepository = AppDataSource.getRepository(Project);

// @desc    獲取用戶的所有專案
// @route   GET /api/projects
// @access  Private
export async function getProjects(req: UserRequest, res: Response): Promise<void> {
  try {
    const projects = await projectRepository.find({
      where: { user: { id: req.user?.id } },
      order: { createdAt: 'DESC' },
    });

    res.json(projects);
  } catch (error) {
    console.error('Get projects error:', error);
    res.status(500).json({ message: '獲取專案列表失敗' });
  }
}

// @desc    獲取單個專案詳情
// @route   GET /api/projects/:id
// @access  Private
export async function getProject(req: UserRequest, res: Response): Promise<void> {
  try {
    const project = await projectRepository.findOne({
      where: { 
        id: req.params.id,
        user: { id: req.user?.id }
      },
      relations: ['tasks', 'team'],
    });

    if (!project) {
      res.status(404).json({ message: '專案不存在' });
      return;
    }

    res.json(project);
  } catch (error) {
    console.error('Get project error:', error);
    res.status(500).json({ message: '獲取專案詳情失敗' });
  }
}

// @desc    創建新專案
// @route   POST /api/projects
// @access  Private
export async function createProject(req: UserRequest, res: Response): Promise<void> {
  try {
    const { title, type, description, startDate, endDate, budget } = req.body;

    // 基本驗證
    if (!title || !type) {
      res.status(400).json({ message: '請填寫必要欄位' });
      return;
    }

    const project = projectRepository.create({
      title,
      type,
      description,
      startDate,
      endDate,
      budget,
      user: req.user,
      containers: req.body.containers || [],
      progress: 0,
    });

    await projectRepository.save(project);

    res.status(201).json(project);
  } catch (error) {
    console.error('Create project error:', error);
    res.status(500).json({ message: '創建專案失敗' });
  }
}

// @desc    更新專案
// @route   PUT /api/projects/:id
// @access  Private
export async function updateProject(req: UserRequest, res: Response): Promise<void> {
  try {
    const project = await projectRepository.findOne({
      where: { 
        id: req.params.id,
        user: { id: req.user?.id }
      },
    });

    if (!project) {
      res.status(404).json({ message: '專案不存在' });
      return;
    }

    // 更新專案資訊
    Object.assign(project, {
      ...req.body,
      editedAt: new Date(),
    });

    await projectRepository.save(project);

    res.json(project);
  } catch (error) {
    console.error('Update project error:', error);
    res.status(500).json({ message: '更新專案失敗' });
  }
}

// @desc    刪除專案
// @route   DELETE /api/projects/:id
// @access  Private
export async function deleteProject(req: UserRequest, res: Response): Promise<void> {
  try {
    const project = await projectRepository.findOne({
      where: { 
        id: req.params.id,
        user: { id: req.user?.id }
      },
    });

    if (!project) {
      res.status(404).json({ message: '專案不存在' });
      return;
    }

    await projectRepository.remove(project);

    res.json({ message: '專案已刪除' });
  } catch (error) {
    console.error('Delete project error:', error);
    res.status(500).json({ message: '刪除專案失敗' });
  }
}

// @desc    更新專案進度
// @route   PATCH /api/projects/:id/progress
// @access  Private
export async function updateProjectProgress(req: UserRequest, res: Response): Promise<void> {
  try {
    const { progress } = req.body;

    if (typeof progress !== 'number' || progress < 0 || progress > 100) {
      res.status(400).json({ message: '進度必須是0-100之間的數字' });
      return;
    }

    const project = await projectRepository.findOne({
      where: { 
        id: req.params.id,
        user: { id: req.user?.id }
      },
    });

    if (!project) {
      res.status(404).json({ message: '專案不存在' });
      return;
    }

    project.progress = progress;
    project.editedAt = new Date();

    await projectRepository.save(project);

    res.json(project);
  } catch (error) {
    console.error('Update project progress error:', error);
    res.status(500).json({ message: '更新專案進度失敗' });
  }
}
