import { AppDataSource } from './data-source';
import { AppDevDataSource } from './data-source.dev';

export const DataSource = process.env.NODE_ENV == 'production' ? AppDataSource : AppDevDataSource;