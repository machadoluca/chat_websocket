import { DataSource } from 'typeorm';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,    
  database: 'wschat',
  synchronize: false,
  logging: false,
  entities: ['src/domain/entities/**/*.ts'],
  migrations: ['src/database/migrations/*.ts'],
  subscribers: [],
});
