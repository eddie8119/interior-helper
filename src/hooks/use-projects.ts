'use client'

import { useState, useEffect } from 'react'
import { Project } from '@/types/project'

const STORAGE_KEY = 'projectList'

const defaultProjects: Project[] = [
  {
    id: '1',
    title: '大興家',
    type: '住宅',
    progress: 60,
    daysLeft: 2,
    createdAt: new Date(),
  },
]

export function useProjects() {
  const [projects, setProjects] = useState<Project[]>([])

  useEffect(() => {
    const storedProjects = localStorage.getItem(STORAGE_KEY)
    if (storedProjects) {
      // Parse the stored projects and convert date strings back to Date objects
      const parsedProjects = JSON.parse(storedProjects).map((project: any) => ({
        ...project,
        createdAt: new Date(project.createdAt),
      }))
      setProjects(parsedProjects)
    } else {
      // Initialize with default projects if none exist
      setProjects(defaultProjects)
      localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultProjects))
    }
  }, [])

  const addProject = (project: Omit<Project, 'id' | 'createdAt'>) => {
    const newProject: Project = {
      ...project,
      id: crypto.randomUUID(),
      createdAt: new Date(),
    }
    const updatedProjects = [...projects, newProject]
    setProjects(updatedProjects)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedProjects))
  }

  const updateProject = (updatedProject: Project) => {
    const updatedProjects = projects.map((project) =>
      project.id === updatedProject.id ? updatedProject : project
    )
    setProjects(updatedProjects)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedProjects))
  }

  const deleteProject = (projectId: string) => {
    const updatedProjects = projects.filter(
      (project) => project.id !== projectId
    )
    setProjects(updatedProjects)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedProjects))
  }

  return {
    projects,
    addProject,
    updateProject,
    deleteProject,
  }
}
