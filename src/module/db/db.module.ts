import { Module } from '@nestjs/common';

import { AlbumsDB } from './albumsDB.service';
import { ArtistsDB } from './artistsDB.service';
import { FavsDB } from './favsDB.service';
import { TracksDB } from './tracksDB.service';
import { UsersDB } from './usersDB.service';

@Module({
  imports: [],
  controllers: [],
  providers: [UsersDB, TracksDB, AlbumsDB, ArtistsDB, FavsDB],
  exports: [UsersDB, TracksDB, AlbumsDB, ArtistsDB, FavsDB],
})
export class DBModule {}
