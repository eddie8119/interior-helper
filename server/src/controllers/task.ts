import { Request, Response } from 'express';
import prisma from '../lib/prisma';
import { AuthRequest } from '../types/auth';

export class TaskController {
  // 獲取項目的所有任務
  async getProjectTasks(req: Request, res: Response) {
    try {
      const { projectId } = req.params;
      const authReq = req as AuthRequest;

      // 檢查項目是否存在且屬於當前用戶
      const project = await prisma.project.findUnique({
        where: { id: projectId },
      });

      if (!project) {
        return res.status(404).json({ error: '找不到項目' });
      }

      if (project.userId !== authReq.user.id) {
        return res.status(403).json({ error: '無權訪問此項目的任務' });
      }

      const tasks = await prisma.task.findMany({
        where: { projectId },
        orderBy: {
          createdAt: 'desc',
        },
      });

      res.json(tasks);
    } catch (error) {
      console.error('獲取任務失敗:', error);
      res.status(500).json({ error: '獲取任務失敗' });
    }
  }

  // 獲取單個任務
  async getTask(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const authReq = req as AuthRequest;

      const task = await prisma.task.findUnique({
        where: { id },
        include: {
          project: true,
        },
      });

      if (!task) {
        return res.status(404).json({ error: '找不到任務' });
      }

      // 檢查任務是否屬於當前用戶的項目
      if (task.project.userId !== authReq.user.id) {
        return res.status(403).json({ error: '無權訪問此任務' });
      }

      res.json(task);
    } catch (error) {
      console.error('獲取任務失敗:', error);
      res.status(500).json({ error: '獲取任務失敗' });
    }
  }

  // 創建新任務
  async createTask(req: Request, res: Response) {
    try {
      const { projectId } = req.params;
      const { constructionType, title, content, priority, dueDate } = req.body;
      const authReq = req as AuthRequest;

      // 檢查項目是否存在且屬於當前用戶
      const project = await prisma.project.findUnique({
        where: { id: projectId },
      });

      if (!project) {
        return res.status(404).json({ error: '找不到項目' });
      }

      if (project.userId !== authReq.user.id) {
        return res.status(403).json({ error: '無權在此項目中創建任務' });
      }

      const newTask = await prisma.task.create({
        data: {
          constructionType,
          title,
          content,
          priority,
          dueDate: dueDate ? new Date(dueDate) : null,
          projectId,
        },
      });

      res.status(201).json(newTask);
    } catch (error) {
      console.error('創建任務失敗:', error);
      res.status(500).json({ error: '創建任務失敗' });
    }
  }

  // 更新任務
  async updateTask(req: Request, res: Response) {
    try {
      const { id } = req.params;
const authReq = req as AuthRequest;

      // 檢查任務是否存在且屬於當前用戶的項目
      const existingTask = await prisma.task.findUnique({
        where: { id },
        include: {
          project: true,
        },
      });

      if (!existingTask) {
        return res.status(404).json({ error: '找不到任務' });
      }

      if (existingTask.project.userId !== authReq.user.id) {
        return res.status(403).json({ error: '無權修改此任務' });
      }

      const updatedTask = await prisma.task.update({
        where: { id },
        data: {
          ...req.body,
          dueDate: req.body.dueDate ? new Date(req.body.dueDate) : undefined,
        },
      });

      res.json(updatedTask);
    } catch (error) {
      console.error('更新任務失敗:', error);
      res.status(500).json({ error: '更新任務失敗' });
    }
  }

  // 刪除任務
  async deleteTask(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const authReq = req as AuthRequest;

      // 檢查任務是否存在且屬於當前用戶的項目
      const task = await prisma.task.findUnique({
        where: { id },
        include: {
          project: true,
        },
      });

      if (!task) {
        return res.status(404).json({ error: '找不到任務' });
      }

      if (task.project.userId !== authReq.user.id) {
        return res.status(403).json({ error: '無權刪除此任務' });
      }

      await prisma.task.delete({
        where: { id },
      });

      res.status(204).send();
    } catch (error) {
      console.error('刪除任務失敗:', error);
      res.status(500).json({ error: '刪除任務失敗' });
    }
  }
}
