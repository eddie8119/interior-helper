export interface IUser {
  id: number;
  email: string;
  password: string;
  name: string;
  role: string;
  isEmailVerified: boolean;
  lastLoginAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export type UserResponse = Omit<IUser, 'password'>;

export interface IUserInput {
  email: string;
  password: string;
  name: string;
}
