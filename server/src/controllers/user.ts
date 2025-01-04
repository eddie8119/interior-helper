import { Request, Response } from 'express';
import { AuthRequest } from '../types/auth';
import prisma from '../lib/prisma';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export class UserController {
  // 用戶註冊
  async register(req: Request, res: Response) {
    try {
      const { email, password, confirmPassword, name } = req.body;

      // 檢查密碼確認是否匹配
      if (password !== confirmPassword) {
        return res.status(400).json({ error: '密碼與確認密碼不匹配' });
      }

      // 檢查郵箱是否已存在
      const existingUser = await prisma.user.findUnique({
        where: { email },
      });

      if (existingUser) {
        return res.status(400).json({ error: '此郵箱已被註冊' });
      }

      // 加密密碼
      const hashedPassword = await bcrypt.hash(password, 10);

      // 創建新用戶
      const newUser = await prisma.user.create({
        data: {
          email,
          password: hashedPassword,
          name,
        },
        select: {
          id: true,
          email: true,
          name: true,
          role: true,
          isEmailVerified: true,
          createdAt: true,
        },
      });

      res.status(201).json(newUser);
    } catch (error) {
      console.error('註冊失敗:', error);
      res.status(500).json({ error: '註冊失敗' });
    }
  }

  // 用戶登錄
  async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;

      // 查找用戶
      const user = await prisma.user.findUnique({
        where: { email },
      });

      if (!user) {
        return res.status(401).json({ error: '郵箱或密碼錯誤' });
      }

      // 驗證密碼
      const isValidPassword = await bcrypt.compare(password, user.password);
      if (!isValidPassword) {
        return res.status(401).json({ error: '郵箱或密碼錯誤' });
      }

      // 更新最後登錄時間
      await prisma.user.update({
        where: { id: user.id },
        data: { lastLoginAt: new Date() },
      });

      // 生成 JWT
      const token = jwt.sign(
        {
          id: user.id,
          email: user.email,
          role: user.role,
        },
        process.env.JWT_SECRET!,
        { expiresIn: process.env.JWT_EXPIRES_IN || '7d' },
      );

      // 設置 cookie
      res.cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      });

      // 返回用戶信息（不包含密碼）
      const { password: _, ...userWithoutPassword } = user;
      res.json({ user: userWithoutPassword, token });
    } catch (error) {
      console.error('登錄失敗:', error);
      res.status(500).json({ error: '登錄失敗' });
    }
  }

  // 登出
  async logout(_req: Request, res: Response) {
    res.clearCookie('token');
    res.json({ message: '成功登出' });
  }

  // 獲取當前用戶信息
  async getCurrentUser(req: Request, res: Response) {
    const authReq = req as AuthRequest;
    try {
      const user = await prisma.user.findUnique({
        where: { id: authReq.user.id },
        select: {
          id: true,
          email: true,
          name: true,
          role: true,
          isEmailVerified: true,
          createdAt: true,
          lastLoginAt: true,
        },
      });

      if (!user) {
        return res.status(404).json({ error: '用戶不存在' });
      }

      res.json(user);
    } catch (error) {
      console.error('獲取用戶信息失敗:', error);
      res.status(500).json({ error: '獲取用戶信息失敗' });
    }
  }

  // 更新用戶信息
  async updateUser(req: Request, res: Response) {
    const authReq = req as AuthRequest;
    try {
      const { name, password } = req.body;

      const updateData: any = {};
      if (name) updateData.name = name;
      if (password) {
        updateData.password = await bcrypt.hash(password, 10);
      }

      const updatedUser = await prisma.user.update({
        where: { id: authReq.user.id },
        data: updateData,
        select: {
          id: true,
          email: true,
          name: true,
          role: true,
          isEmailVerified: true,
          lastLoginAt: true,
          createdAt: true,
        },
      });

      res.json(updatedUser);
    } catch (error) {
      console.error('更新用戶信息失敗:', error);
      res.status(500).json({ error: '更新用戶信息失敗' });
    }
  }

  // 刪除用戶帳號
  async deleteUser(req: Request, res: Response) {
    const authReq = req as AuthRequest;
    try {
      await prisma.user.delete({
        where: { id: authReq.user.id },
      });

      res.clearCookie('token');
      res.status(204).send();
    } catch (error) {
      console.error('刪除帳號失敗:', error);
      res.status(500).json({ error: '刪除帳號失敗' });
    }
  }
}
