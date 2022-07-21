import { Module } from '@nestjs/common';

import { FavsService } from './favs.service';
import { FavsController } from './favs.controller';
import { TracksModule } from '../tracks/tracks.module';
import { ArtistsModule } from '../artists/artists.module';
import { AlbumsModule } from '../albums/albums.module';
import { DBModule } from '../db/db.module';

@Module({
  imports: [TracksModule, ArtistsModule, AlbumsModule, ArtistsModule, DBModule],
  controllers: [FavsController],
  providers: [FavsService],
  exports: [FavsService],
})
export class FavsModule {}
