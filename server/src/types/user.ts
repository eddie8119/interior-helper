import { Document } from 'mongoose';

export interface IUser {
  email: string;
  password: string;
  name: string;
  role: string;
  isEmailVerified: boolean;
  lastLoginAt?: Date;
}

export interface IUserInput {
  email: string;
  password: string;
  name: string;
}
