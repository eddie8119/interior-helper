import { Request } from 'express';
import { JwtPayload } from 'jsonwebtoken';

export interface AuthUser {
  id: number;
  email: string;
  role: string;
}

export interface AuthRequest extends Request {
  user: AuthUser;
}

export interface JwtCustomPayload extends JwtPayload {
  id: number;
  email: string;
  role: string;
}
