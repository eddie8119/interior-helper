import request from '@/lib/request'
import { CreateProjectData, UpdateProjectData } from '@/types/api/project'

// 獲取所有項目
export function getAllProjects() {
  return request({
    url: '/project',
    method: 'get',
  })
}

// 獲取特定項目
export function getProjectById(id: string) {
  return request({
    url: `/project/${id}`,
    method: 'get',
  })
}

// 創建項目
export function createProject(data: CreateProjectData) {
  return request({
    url: '/project',
    method: 'post',
    data,
  })
}

// 更新項目
export function updateProject(id: string, data: UpdateProjectData) {
  return request({
    url: `/project/${id}`,
    method: 'put',
    data,
  })
}

// 刪除項目
export function deleteProject(id: string) {
  return request({
    url: `/project/${id}`,
    method: 'delete',
  })
}
