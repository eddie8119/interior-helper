import  request  from '@/lib/request';
import { RegisterData, LoginData, UpdateUserData, UpdatePasswordData } from '@/types/user';

export function register(data: RegisterData) {
  return request({
    url: "/user/register",
    method: "post",
    data,
  });
}

export function login(data: LoginData) {
  return request({
    url: "/user/login",
    method: "post",
    data,
  });
}

export function logout() {
  return request({
    url: "/user/logout",
    method: "post",
  });
}

export function getCurrentUser() {
  return request({
    url: "/user/me",
    method: "get",
  });
}

export function updateCurrentUser(data: UpdateUserData) {
  return request({
    url: "/user/me",
    method: "put",
    data,
  });
}

export function updatePassword(data: UpdatePasswordData) {
  return request({
    url: "/user/password",
    method: "put",
    data,
  });
}