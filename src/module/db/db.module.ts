import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserEntity } from '../../endpoints/users/entities/user.entity';
import { TrackEntity } from '../../endpoints/tracks/entities/track.entity';
import { AlbumEntity } from '../../endpoints/albums/entities/album.entity';
import { ArtistEntity } from '../../endpoints/artists/entities/artist.entity';
import { FavsEntity } from '../../endpoints/favs/entities/favs.entity';
import { AlbumsDB } from './albumsDB.service';
import { ArtistsDB } from './artistsDB.service';
import { FavsDB } from './favsDB.service';
import { TracksDB } from './tracksDB.service';
import { UsersDB } from './usersDB.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      UserEntity,
      TrackEntity,
      AlbumEntity,
      ArtistEntity,
      FavsEntity,
    ]),
  ],
  controllers: [],
  providers: [UsersDB, TracksDB, AlbumsDB, ArtistsDB, FavsDB],
  exports: [UsersDB, TracksDB, AlbumsDB, ArtistsDB, FavsDB],
})
export class DBModule {}
