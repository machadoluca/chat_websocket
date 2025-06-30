import { DataSource } from 'typeorm';

export const AppDevDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'chatuser',
  password: process.env.DB_PASSWORD,
  database: 'dev_wschat',
  synchronize: true,
  logging: true,
  entities: ['src/domain/entities/**/*.ts'],
  migrations: ['src/database/migrations/*.ts'],
  subscribers: [],
});
