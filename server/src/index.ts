import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import config from './config';
import routes from './routes';

// 建立 Express 應用
const app = express();

// 中間件設置
app.use(cors(config.cors));
app.use(express.json());
app.use(cookieParser());

// 請求日誌中間件
app.use((req: Request, _res: Response, next: NextFunction) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// API 路由
app.use(config.api.prefix, routes);

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
    message: config.env === 'development' ? err.message : '服務器內部錯誤',
  });
});

// 處理未捕獲的異常
process.on('unhandledRejection', (reason: Error) => {
  console.error('未處理的 Promise 拒絕:', reason);
});

process.on('uncaughtException', (error: Error) => {
  console.error('未捕獲的異常:', error);
  process.exit(1);
});

// 啟動服務器
app.listen(config.port, () => {
  console.log(`服務器運行在 http://localhost:${config.port}`);
  console.log(`環境: ${config.env}`);
});
