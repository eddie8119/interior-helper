export interface RegisterData {
  email: string;
  password: string;
  confirmPassword: string;
  name: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface UpdateUserData {
  name?: string;
  currentPassword?: string;
  newPassword?: string;
  confirmPassword?: string;
}
