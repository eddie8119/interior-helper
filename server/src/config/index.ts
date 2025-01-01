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
  port: parseInt(process.env.PORT || '5000', 10),
  jwtSecret: process.env.JWT_SECRET,
  database: {
    url: process.env.DATABASE_URL,
  },
  // 其他配置...
};

// 驗證必要的環境變量
const validateConfig = () => {
  const requiredEnvVars = ['JWT_SECRET', 'DATABASE_URL'];

  for (const envVar of requiredEnvVars) {
    if (!process.env[envVar]) {
      throw new Error(`Missing required environment variable: ${envVar}`);
    }
  }

  // JWT_SECRET 長度檢查
  if (process.env.JWT_SECRET!.length < 32) {
    throw new Error('JWT_SECRET is too short (minimum 32 characters)');
  }

  // 生產環境特定檢查
  if (process.env.NODE_ENV === 'production') {
    // 確保生產環境使用更複雜的密鑰
    if (process.env.JWT_SECRET === 'dev_jwt_secret_123456') {
      throw new Error('Production environment cannot use development JWT_SECRET');
    }
  }
};

// 在應用啟動時驗證配置
validateConfig();

export default config;
