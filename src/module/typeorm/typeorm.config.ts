import 'dotenv/config';
import { DataSourceOptions } from 'typeorm';

import { AlbumEntity } from '../albums/entities/album.entity';
import { ArtistEntity } from '../artists/entities/artist.entity';
import { UsersEntity } from '../auth/entities/users.entity';
import { FavsEntity } from '../favs/entities/favs.entity';
import { TrackEntity } from '../tracks/entities/track.entity';
import { UserEntity } from '../users/entities/user.entity';

export default {
  type: 'postgres',
  host: process.env.POSTGRES_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  synchronize: false,
  entities: [
    UserEntity,
    UsersEntity,
    TrackEntity,
    AlbumEntity,
    ArtistEntity,
    FavsEntity,
  ],
  migrations: ['dist/module/typeorm/migrations/*.js'],
  migrationsRun: true,
  logging: false,
} as DataSourceOptions;
