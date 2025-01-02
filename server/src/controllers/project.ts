import { Request, Response } from 'express';
import prisma from '../lib/prisma';
import { AuthRequest } from '../types/auth';

export class ProjectController {
  // 獲取所有項目
  async getAllProjects(req: AuthRequest, res: Response) {
    try {
      const projects = await prisma.project.findMany({
        where: { userId: req.user.id },
        include: {
          tasks: true,
        },
        orderBy: {
          updatedAt: 'desc',
        },
      });

      res.json(projects);
    } catch (error) {
      console.error('獲取項目列表失敗:', error);
      res.status(500).json({ error: '獲取項目列表失敗' });
    }
  }

  // 獲取特定項目
  async getProjectById(req: AuthRequest, res: Response) {
    try {
      const { id } = req.params;

      const project = await prisma.project.findFirst({
        where: {
          id: parseInt(id),
          userId: req.user.id,
        },
        include: {
          tasks: true,
        },
      });

      if (!project) {
        return res.status(404).json({ error: '找不到項目' });
      }

      res.json(project);
    } catch (error) {
      console.error('獲取項目失敗:', error);
      res.status(500).json({ error: '獲取項目失敗' });
    }
  }

  // 創建項目
  async createProject(req: AuthRequest, res: Response) {
    try {
      const { name, description, startDate, endDate, budget } = req.body;

      const project = await prisma.project.create({
        data: {
          name,
          description,
          startDate: new Date(startDate),
          endDate: endDate ? new Date(endDate) : null,
          budget: parseFloat(budget),
          userId: req.user.id,
        },
      });

      res.status(201).json(project);
    } catch (error) {
      console.error('創建項目失敗:', error);
      res.status(500).json({ error: '創建項目失敗' });
    }
  }

  // 更新項目
  async updateProject(req: AuthRequest, res: Response) {
    try {
      const { id } = req.params;
      const { name, description, startDate, endDate, budget, status } = req.body;

      // 檢查項目是否存在且屬於當前用戶
      const existingProject = await prisma.project.findFirst({
        where: {
          id: parseInt(id),
          userId: req.user.id,
        },
      });

      if (!existingProject) {
        return res.status(404).json({ error: '找不到項目' });
      }

      const project = await prisma.project.update({
        where: { id: parseInt(id) },
        data: {
          name,
          description,
          startDate: startDate ? new Date(startDate) : undefined,
          endDate: endDate ? new Date(endDate) : null,
          budget: budget ? parseFloat(budget) : undefined,
          status,
        },
      });

      res.json(project);
    } catch (error) {
      console.error('更新項目失敗:', error);
      res.status(500).json({ error: '更新項目失敗' });
    }
  }

  // 刪除項目
  async deleteProject(req: AuthRequest, res: Response) {
    try {
      const { id } = req.params;

      // 檢查項目是否存在且屬於當前用戶
      const existingProject = await prisma.project.findFirst({
        where: {
          id: parseInt(id),
          userId: req.user.id,
        },
      });

      if (!existingProject) {
        return res.status(404).json({ error: '找不到項目' });
      }

      // 首先刪除項目相關的所有任務
      await prisma.task.deleteMany({
        where: { projectId: parseInt(id) },
      });

      // 然後刪除項目
      await prisma.project.delete({
        where: { id: parseInt(id) },
      });

      res.status(204).send();
    } catch (error) {
      console.error('刪除項目失敗:', error);
      res.status(500).json({ error: '刪除項目失敗' });
    }
  }
}
