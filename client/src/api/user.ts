import  request  from '@/lib/request';
import { RegisterData, LoginData, UpdateUserData, UpdatePasswordData } from '@/types/user';

export function register(data: RegisterData) {
  return request({
    url: "/auth/register",
    method: "post",
    data,
  });
}

export function login(data: LoginData) {
  return request({
    url: "/auth/login",
    method: "post",
    data,
  });
}

export function logout() {
  return request({
    url: "/auth/logout",
    method: "post",
  });
}

export function getCurrentUser() {
  return request({
    url: "/auth/me",
    method: "get",
  });
}

export function updateCurrentUser(data: UpdateUserData) {
  return request({
    url: "/auth/me",
    method: "put",
    data,
  });
}

export function updatePassword(data: UpdatePasswordData) {
  return request({
    url: "/auth/password",
    method: "put",
    data,
  });
}