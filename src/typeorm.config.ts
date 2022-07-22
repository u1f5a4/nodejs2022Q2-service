import 'dotenv/config';
import { DataSourceOptions } from 'typeorm';
import { AlbumEntity } from './module/albums/entities/album.entity';
import { TrackEntity } from './module/tracks/entities/track.entity';
import { UserEntity } from './module/users/entities/user.entity';

export default {
  type: 'postgres',
  host: process.env.POSTGRES_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  synchronize: true,
  entities: [UserEntity, TrackEntity, AlbumEntity],
  migrations: ['src/migration/**/*.ts'],
  migrationRun: true,
  logging: true,
} as DataSourceOptions;
