import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserEntity } from '../users/entities/user.entity';
import { TrackEntity } from '../tracks/entities/track.entity';
import { AlbumEntity } from '../albums/entities/album.entity';
import { ArtistEntity } from '../artists/entities/artist.entity';
import { FavsEntity } from '../favs/entities/favs.entity';
import { UsersEntity } from '../auth/entities/users.entity';
import { AlbumsDB } from './albumsDB.service';
import { ArtistsDB } from './artistsDB.service';
import { FavsDB } from './favsDB.service';
import { TracksDB } from './tracksDB.service';
import { UserDB } from './userDB.service';
import { UsersDB } from './usersDB.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      UserEntity,
      UsersEntity,
      TrackEntity,
      AlbumEntity,
      ArtistEntity,
      FavsEntity,
    ]),
  ],
  controllers: [],
  providers: [UserDB, UsersDB, TracksDB, AlbumsDB, ArtistsDB, FavsDB],
  exports: [UserDB, UsersDB, TracksDB, AlbumsDB, ArtistsDB, FavsDB],
})
export class DBModule {}
