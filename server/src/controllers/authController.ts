import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { AppDataSource } from '../config/database';
import { User } from '../entities/User';
import { AuthRequest } from '../middleware/auth';

// 初始化 repository
const userRepository = AppDataSource.getRepository(User);

// 生成 JWT Token
const generateToken = (id: string): string => {
  return jwt.sign({ id }, process.env.JWT_SECRET as string, {
    expiresIn: '30d',
  });
};

// @desc    註冊新用戶
// @route   POST /api/auth/register
// @access  Public
export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password, name } = req.body;

    // 檢查必要欄位
    if (!email || !password || !name) {
      res.status(400).json({ message: '請填寫所有必要欄位' });
      return;
    }

    // 檢查密碼長度
    if (password.length < 6) {
      res.status(400).json({ message: '密碼長度至少需要6個字符' });
      return;
    }

    // 檢查用戶是否已存在
    const userExists = await userRepository.findOne({ where: { email } });
    if (userExists) {
      res.status(400).json({ message: '此信箱已被註冊' });
      return;
    }

    // 創建用戶
    const user = userRepository.create({
      email,
      password,
      name,
    });

    await userRepository.save(user);

    // 生成 token
    const token = generateToken(user.id);

    // 設置 cookie
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
    });

    res.status(201).json({
      id: user.id,
      name: user.name,
      email: user.email,
      token,
    });
  } catch (error) {
    console.error('Register error:', error);
    res.status(500).json({ message: '註冊失敗，請稍後再試' });
  }
};

// @desc    登入用戶
// @route   POST /api/auth/login
// @access  Public
export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;

    // 檢查必要欄位
    if (!email || !password) {
      res.status(400).json({ message: '請填寫所有必要欄位' });
      return;
    }

    // 查找用戶
    const user = await userRepository.findOne({ where: { email } });
    if (!user) {
      res.status(401).json({ message: '信箱或密碼錯誤' });
      return;
    }

    // 驗證密碼
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      res.status(401).json({ message: '信箱或密碼錯誤' });
      return;
    }

    // 更新最後登入時間
    user.lastLoginAt = new Date();
    await userRepository.save(user);

    // 生成 token
    const token = generateToken(user.id);

    // 設置 cookie
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
    });

    res.json({
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      isEmailVerified: user.isEmailVerified,
      token,
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: '登入失敗，請稍後再試' });
  }
};

// @desc    登出用戶
// @route   POST /api/auth/logout
// @access  Private
export const logout = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    // 清除 cookie
    res.cookie('token', '', {
      httpOnly: true,
      expires: new Date(0),
    });

    res.json({ message: '登出成功' });
  } catch (error) {
    console.error('Logout error:', error);
    res.status(500).json({ message: '登出失敗，請稍後再試' });
  }
};

// @desc    獲取當前用戶信息
// @route   GET /api/auth/me
// @access  Private
export const getCurrentUser = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const user = await userRepository.findOne({
      where: { id: req.user?.id },
      select: ['id', 'name', 'email', 'role', 'isEmailVerified', 'lastLoginAt', 'avatar'],
    });

    if (!user) {
      res.status(404).json({ message: '用戶不存在' });
      return;
    }

    res.json(user);
  } catch (error) {
    console.error('Get current user error:', error);
    res.status(500).json({ message: '獲取用戶信息失敗' });
  }
};

// @desc    更新用戶信息
// @route   PUT /api/auth/me
// @access  Private
export const updateCurrentUser = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const user = await userRepository.findOne({ where: { id: req.user?.id } });

    if (!user) {
      res.status(404).json({ message: '用戶不存在' });
      return;
    }

    const { name, avatar } = req.body;

    if (name) user.name = name;
    if (avatar) user.avatar = avatar;

    await userRepository.save(user);

    res.json({
      id: user.id,
      name: user.name,
      email: user.email,
      avatar: user.avatar,
    });
  } catch (error) {
    console.error('Update user error:', error);
    res.status(500).json({ message: '更新用戶信息失敗' });
  }
};

// @desc    更改密碼
// @route   PUT /api/auth/password
// @access  Private
export const updatePassword = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      res.status(400).json({ message: '請填寫所有必要欄位' });
      return;
    }

    if (newPassword.length < 6) {
      res.status(400).json({ message: '新密碼長度至少需要6個字符' });
      return;
    }

    const user = await userRepository.findOne({ where: { id: req.user?.id } });

    if (!user) {
      res.status(404).json({ message: '用戶不存在' });
      return;
    }

    // 驗證當前密碼
    const isMatch = await user.comparePassword(currentPassword);
    if (!isMatch) {
      res.status(401).json({ message: '當前密碼錯誤' });
      return;
    }

    // 更新密碼
    user.password = newPassword;
    await userRepository.save(user);

    res.json({ message: '密碼更新成功' });
  } catch (error) {
    console.error('Update password error:', error);
    res.status(500).json({ message: '更新密碼失敗' });
  }
};
