import { Request, Response } from 'express';
import { Prisma } from '@prisma/client';
import prisma from '../lib/prisma';
import { AuthRequest } from '../types/auth';

export class ProjectController {
  // 獲取所有項目
  async getAllProjects(req: Request, res: Response) {
    try {
      const authReq = req as AuthRequest;

      const projects = await prisma.project.findMany({
        where: { userId: authReq.user.id },
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
  async getProjectById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const authReq = req as AuthRequest;

      const project = await prisma.project.findFirst({
        where: {
          id,
          userId: authReq.user.id,
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
  async createProject(req: Request, res: Response) {
    try {
      const { title, type } = req.body;
      const authReq = req as AuthRequest;

      const project = await prisma.project.create({
        data: {
          title,
          type,
          userId: authReq.user.id,
        },
      });

      res.status(201).json(project);
    } catch (error) {
      console.error('創建項目失敗:', error);
      res.status(500).json({ error: '創建項目失敗' });
    }
  }

  // 更新項目
  async updateProject(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { title, type, startDate, endDate, budgetTotal, costTotal, progress, containers } =
        req.body;
      const authReq = req as AuthRequest;

      // 檢查項目是否存在且屬於當前用戶
      const existingProject = await prisma.project.findFirst({
        where: {
          id,
          userId: authReq.user.id,
        },
      });

      if (!existingProject) {
        return res.status(404).json({ error: '找不到項目' });
      }

      const updateData: any = {};

      // 只更新有提供的欄位
      if (title !== undefined) updateData.title = title;
      if (type !== undefined) updateData.type = type;
      if (startDate !== undefined) updateData.startDate = startDate ? new Date(startDate) : null;
      if (endDate !== undefined) updateData.endDate = endDate ? new Date(endDate) : null;
      if (budgetTotal !== undefined)
        updateData.budgetTotal = budgetTotal ? parseFloat(budgetTotal) : null;
      if (costTotal !== undefined) updateData.costTotal = costTotal ? parseFloat(costTotal) : null;
      if (progress !== undefined) updateData.progress = parseFloat(progress);
      if (containers !== undefined) updateData.containers = containers;

      const project = await prisma.project.update({
        where: {
          id,
          userId: authReq.user.id,
        },
        data: updateData,
        include: {
          tasks: true, // 包含關聯的任務資料
        },
      });

      res.json(project);
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          return res.status(404).json({ error: '找不到項目或無權限修改' });
        }
      }
      console.error('更新項目失敗:', error);
      res.status(500).json({ error: '更新項目失敗' });
    }
  }

  // 刪除項目
  async deleteProject(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const authReq = req as AuthRequest;

      await prisma.project.delete({
        where: {
          id,
          userId: authReq.user.id,
        },
      });

      res.status(204).send();
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          return res.status(404).json({ error: '找不到項目或無權限刪除' });
        }
      }
      console.error('刪除項目失敗:', error);
      res.status(500).json({ error: '刪除項目失敗' });
    }
  }
}
