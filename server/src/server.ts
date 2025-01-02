import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { config } from 'dotenv';
import routes from './routes';
import prisma from './lib/prisma';

// 載入環境變數
config();

// 建立 Express 應用
const app = express();
const port = process.env.PORT || 3000;

// 中間件設置
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? process.env.FRONTEND_URL 
    : 'http://localhost:3000',
  credentials: true,
}));

app.use(express.json());
app.use(cookieParser());

// 請求日誌中間件
app.use((req: Request, _res: Response, next: NextFunction) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// API 路由
app.use(process.env.API_PREFIX || '/api', routes);

// 404 處理
app.use((_req: Request, res: Response) => {
  res.status(404).json({
    status: 'error',
    message: '找不到該路由',
  });
});

// 全局錯誤處理
app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  console.error('Error:', err);
  res.status(500).json({
    status: 'error',
    message: process.env.NODE_ENV === 'development' ? err.message : '服務器內部錯誤',
  });
});

// 初始化服務器
const startServer = async () => {
  try {
    // 測試資料庫連接
    await prisma.$connect();
    console.log('✓ 資料庫連接成功');

    // 啟動服務器
    app.listen(port, () => {
      console.log(`✓ 服務器運行在端口 ${port}`);
      console.log(`✓ 環境: ${process.env.NODE_ENV}`);
      console.log(`✓ 訪問 API: http://localhost:${port}${process.env.API_PREFIX || '/api'}`);
    });
  } catch (error) {
    console.error('✗ 啟動服務器時發生錯誤:', error);
    process.exit(1);
  }
};

// 處理未捕獲的異常
process.on('unhandledRejection', (reason: Error) => {
  console.error('未處理的 Promise 拒絕:', reason);
});

process.on('uncaughtException', (error: Error) => {
  console.error('未捕獲的異常:', error);
  process.exit(1);
});

// 優雅關閉
process.on('SIGTERM', async () => {
  console.log('正在關閉應用...');
  await prisma.$disconnect();
  process.exit(0);
});

// 啟動應用
startServer();
