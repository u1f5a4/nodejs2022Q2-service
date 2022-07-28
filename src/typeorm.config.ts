import 'dotenv/config';
import { DataSourceOptions } from 'typeorm';

import { AlbumEntity } from './module/albums/entities/album.entity';
import { ArtistEntity } from './module/artists/entities/artist.entity';
import { FavsEntity } from './module/favs/entities/favs.entity';
import { TrackEntity } from './module/tracks/entities/track.entity';
import { UserEntity } from './module/users/entities/user.entity';

export default {
  type: 'postgres',
  host: process.env.POSTGRES_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  synchronize: false,
  entities: [UserEntity, TrackEntity, AlbumEntity, ArtistEntity, FavsEntity],
  migrations: ['dist/migrations/*.js'],
  migrationsRun: true,
  logging: false,
} as DataSourceOptions;
