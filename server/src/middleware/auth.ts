import { Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import prisma from '../lib/prisma';
import { AuthRequest, JwtCustomPayload } from '../types/auth';

// 擴展 Request 類型以包含用戶信息
declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        email: string;
        role: string;
      };
    }
  }
}

export async function authMiddleware(
  req: AuthRequest,
  res: Response,
  next: NextFunction
) {
  try {
    // 從 header 或 cookie 中獲取 token
    const token = 
      req.headers.authorization?.split(' ')[1] || 
      req.cookies.token;

    if (!token) {
      return res.status(401).json({ error: '未提供認證令牌' });
    }

    // 驗證 token
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET!
    ) as JwtCustomPayload;

    // 檢查用戶是否存在
    const user = await prisma.user.findUnique({
      where: { id: decoded.id },
      select: {
        id: true,
        email: true,
        role: true
      }
    });

    if (!user) {
      return res.status(401).json({ error: '用戶不存在' });
    }

    // 將用戶信息添加到請求對象
    req.user = user;

    next();
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      return res.status(401).json({ error: '無效的認證令牌' });
    }
    console.error('認證中間件錯誤:', error);
    res.status(500).json({ error: '認證失敗' });
  }
}
