import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { AppDataSource } from '../config/database';
import { User } from '../entities/User';

export interface UserRequest extends Request {
  user?: User;
}

export const protect = async (
  req: UserRequest,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    let token: string | undefined;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    } else if (req.cookies?.token) {
      token = req.cookies.token;
    }

    if (!token) {
      res.status(401).json({ message: '請先登入' });
      return;
    }

    try {
      // 驗證 token
      const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { id: string };

      // 獲取用戶信息
      const userRepository = AppDataSource.getRepository(User);
      const user = await userRepository.findOne({
        where: { id: decoded.id },
        select: ['id', 'email', 'name', 'role', 'isEmailVerified', 'lastLoginAt'],
      });

      if (!user) {
        res.status(401).json({ message: '用戶不存在' });
        return;
      }

      req.user = user;
      next();
    } catch (error) {
      res.status(401).json({ message: 'Token 無效或已過期' });
      return;
    }
  } catch (error) {
    res.status(500).json({ message: '服務器錯誤' });
  }
};
