import { DataSource } from 'typeorm';

import typeormConfig from './typeorm.config';

export const AppDataSource = new DataSource(typeormConfig);
