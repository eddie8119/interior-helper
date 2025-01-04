import { Request } from 'express';
import { JwtPayload } from 'jsonwebtoken';

export interface AuthUser {
  id: string;
  email: string;
  role: string;
}

export interface AuthRequest extends Request {
  user: AuthUser;
}

export interface JwtCustomPayload extends JwtPayload {
  id: string;
  email: string;
  role: string;
}
