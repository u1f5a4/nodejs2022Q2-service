import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserEntity } from '../users/entities/user.entity';
import { TrackEntity } from '../tracks/entities/track.entity';
import { AlbumsDB } from './albumsDB.service';
import { ArtistsDB } from './artistsDB.service';
import { FavsDB } from './favsDB.service';
import { TracksDB } from './tracksDB.service';
import { UsersDB } from './usersDB.service';
import { AlbumEntity } from '../albums/entities/album.entity';
import { ArtistEntity } from '../artists/entities/artist.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      UserEntity,
      TrackEntity,
      AlbumEntity,
      ArtistEntity,
    ]),
  ],
  controllers: [],
  providers: [UsersDB, TracksDB, AlbumsDB, ArtistsDB, FavsDB],
  exports: [UsersDB, TracksDB, AlbumsDB, ArtistsDB, FavsDB],
})
export class DBModule {}
