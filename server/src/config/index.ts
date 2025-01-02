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
  database: {
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '3306', 10),
    username: process.env.DB_USERNAME || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_DATABASE || 'interior_helper',
  },
  api: {
    prefix: process.env.API_PREFIX || '/api',
  }
};

// 驗證必要的環境變量
const validateConfig = () => {
  const requiredEnvVars = ['JWT_SECRET', 'DB_PASSWORD'];

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
    if (!process.env.DB_PASSWORD || process.env.DB_PASSWORD === 'default_password') {
      throw new Error('生產環境不能使用預設密碼');
    }
  }
};

// 在應用啟動時驗證配置
validateConfig();

export default config;
