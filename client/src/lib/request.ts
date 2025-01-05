import axios from 'axios'

let baseURL
const localhostURL = 'http://localhost:5000/api'
const devURL = ''

const server = axios.create({
  baseURL: 'http://localhost:5000/api', // 根據你的後端 URL 調整
  withCredentials: true, // 允許跨域請求攜帶 cookie
  headers: {
    'Content-Type': 'application/json',
  },
})

// 響應攔截器
server.interceptors.response.use(
  (response) => response,
  (error) => {
    // 統一處理錯誤
    const message = error.response?.data?.message || '發生錯誤，請稍後再試'
    console.error('API Error:', message)
    return Promise.reject(error)
  }
)

export default server
