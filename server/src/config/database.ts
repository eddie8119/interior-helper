import { DataSource } from 'typeorm';
import { config } from 'dotenv';
import path from 'path';

// 載入環境變數
config();

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '3306'),
  username: process.env.DB_USERNAME || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_DATABASE || 'interior_helper',
  synchronize: process.env.NODE_ENV === 'development', // 開發環境下自動同步資料庫結構
  logging: process.env.NODE_ENV === 'development',     // 開發環境下顯示 SQL 日誌
  entities: [path.join(__dirname, '..', 'entities', '*.{ts,js}')],
  migrations: [path.join(__dirname, '..', 'migrations', '*.{ts,js}')],
  subscribers: [path.join(__dirname, '..', 'subscribers', '*.{ts,js}')],
});

export const initializeDatabase = async () => {
  try {
    await AppDataSource.initialize();
    console.log('Database connection established');
  } catch (error) {
    console.error('Error connecting to database:', error);
    process.exit(1);
  }
};
