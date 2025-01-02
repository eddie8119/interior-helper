import dotenv from 'dotenv';
import path from 'path';

// 根據 NODE_ENV 加載對應的環境變量文件
const envFile = process.env.NODE_ENV === 'production' ? '.env.production' : '.env.development';

dotenv.config({
  path: path.resolve(process.cwd(), envFile),
});

// 配置對象
const config = {
  env: process.env.NODE_ENV || 'development',
  port: parseInt(process.env.PORT || '3000', 10),
  jwtSecret: process.env.JWT_SECRET,
  api: {
    prefix: process.env.API_PREFIX || '/api',
  },
  cors: {
    origin: process.env.FRONTEND_URL || 'http://localhost:5173',
    credentials: true,
  }
};

// 驗證必要的環境變量
const validateConfig = () => {
  const requiredEnvVars = ['JWT_SECRET', 'DATABASE_URL'];

  for (const envVar of requiredEnvVars) {
    if (!process.env[envVar]) {
      throw new Error(`缺少必要的環境變數: ${envVar}`);
    }
  }

  // JWT_SECRET 長度檢查
  if (process.env.JWT_SECRET!.length < 32) {
    throw new Error('JWT_SECRET 太短了 (最少需要 32 個字符)');
  }

  // 生產環境特定檢查
  if (process.env.NODE_ENV === 'production') {
    if (!process.env.DATABASE_URL || process.env.DATABASE_URL.includes('localhost')) {
      throw new Error('生產環境不能使用本地數據庫');
    }
  }
};

// 在應用啟動時驗證配置
validateConfig();

export default config;
