import { DataSourceOptions } from 'typeorm';
import 'dotenv/config';

import { AlbumEntity } from '../../endpoints/albums/entities/album.entity';
import { ArtistEntity } from '../../endpoints/artists/entities/artist.entity';
import { FavsEntity } from '../../endpoints/favs/entities/favs.entity';
import { TrackEntity } from '../../endpoints/tracks/entities/track.entity';
import { UserEntity } from '../../endpoints/users/entities/user.entity';

export default {
  type: 'postgres',
  host: process.env.POSTGRES_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  synchronize: false,
  entities: [UserEntity, TrackEntity, AlbumEntity, ArtistEntity, FavsEntity],
  migrations: ['dist/module/typeorm/migrations/*.js'],
  migrationsRun: true,
  logging: false,
} as DataSourceOptions;
