import { initializeApp } from 'firebase/app'
import {
  collection,
  deleteDoc,
  doc,
  DocumentData,
  getDoc,
  getDocs,
  getFirestore,
  query,
  setDoc,
  updateDoc,
  where,
} from 'firebase/firestore'
import { ProjectBasic, ProjectDetail, Task } from '@/types/project'

const firebaseConfig = {
  // 你的 Firebase 配置
}

// 初始化 Firebase
const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

// 集合名稱
const COLLECTIONS = {
  PROJECTS: 'projects',
  TASKS: 'tasks',
  PROJECT_DETAILS: 'project_details',
} as const

// Firebase 服務
export const firebaseService = {
  // 專案相關操作
  projects: {
    // 獲取所有專案
    getAll: async (): Promise<ProjectBasic[]> => {
      const querySnapshot = await getDocs(collection(db, COLLECTIONS.PROJECTS))
      return querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
        createdAt: doc.data().createdAt.toDate(),
      })) as ProjectBasic[]
    },

    // 添加專案
    add: async (project: ProjectBasic): Promise<void> => {
      await setDoc(doc(db, COLLECTIONS.PROJECTS, project.id), project)
    },

    // 更新專案
    update: async (
      projectId: string,
      data: Partial<ProjectBasic>
    ): Promise<void> => {
      await updateDoc(doc(db, COLLECTIONS.PROJECTS, projectId), data)
    },

    // 刪除專案
    delete: async (projectId: string): Promise<void> => {
      await deleteDoc(doc(db, COLLECTIONS.PROJECTS, projectId))
    },
  },

  // 任務相關操作
  tasks: {
    // 獲取所有任務
    getAll: async (): Promise<Task[]> => {
      const querySnapshot = await getDocs(collection(db, COLLECTIONS.TASKS))
      return querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
        createdAt: doc.data().createdAt.toDate(),
        updatedAt: doc.data().updatedAt.toDate(),
      })) as Task[]
    },

    // 獲取專案任務
    getByProject: async (projectId: string): Promise<Task[]> => {
      const q = query(
        collection(db, COLLECTIONS.TASKS),
        where('projectId', '==', projectId)
      )
      const querySnapshot = await getDocs(q)
      return querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
        createdAt: doc.data().createdAt.toDate(),
        updatedAt: doc.data().updatedAt.toDate(),
      })) as Task[]
    },

    // 添加任務
    add: async (task: Task): Promise<void> => {
      await setDoc(doc(db, COLLECTIONS.TASKS, task.id), task)
    },

    // 更新任務
    update: async (taskId: string, data: Partial<Task>): Promise<void> => {
      await updateDoc(doc(db, COLLECTIONS.TASKS, taskId), data)
    },

    // 刪除任務
    delete: async (taskId: string): Promise<void> => {
      await deleteDoc(doc(db, COLLECTIONS.TASKS, taskId))
    },
  },

  // 專案詳細信息操作
  projectDetails: {
    // 獲取專案詳細信息
    get: async (projectId: string): Promise<ProjectDetail | null> => {
      const docSnap = await getDoc(
        doc(db, COLLECTIONS.PROJECT_DETAILS, projectId)
      )
      if (!docSnap.exists()) return null
      const data = docSnap.data()
      return {
        ...data,
        createdAt: data.createdAt.toDate(),
      } as ProjectDetail
    },

    // 設置專案詳細信息
    set: async (projectId: string, detail: ProjectDetail): Promise<void> => {
      await setDoc(doc(db, COLLECTIONS.PROJECT_DETAILS, projectId), detail)
    },

    // 更新專案詳細信息
    update: async (
      projectId: string,
      data: Partial<ProjectDetail>
    ): Promise<void> => {
      await updateDoc(doc(db, COLLECTIONS.PROJECT_DETAILS, projectId), data)
    },

    // 刪除專案詳細信息
    delete: async (projectId: string): Promise<void> => {
      await deleteDoc(doc(db, COLLECTIONS.PROJECT_DETAILS, projectId))
    },
  },
}
