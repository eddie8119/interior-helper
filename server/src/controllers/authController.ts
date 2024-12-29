import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User';
import { IUserInput } from '../types/user';

// @desc    Register a new user
// @route   POST /api/auth/register
// @access  Public
export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password, name }: IUserInput = req.body;

    // Check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      res.status(400).json({ message: '此信箱已被註冊' });
      return;
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user
    const user = await User.create({
      email,
      password: hashedPassword,
      name,
    });

    if (user) {
      // Create token
      const token = jwt.sign(
        { id: user._id },
        process.env.JWT_SECRET as string,
        { expiresIn: '30d' }
      );

      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        token,
      });
    }
  } catch (error) {
    console.error('Register error:', error);
    res.status(500).json({ message: '註冊失敗，請稍後再試' });
  }
};
