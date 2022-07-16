import { Module } from '@nestjs/common';

import { FavsService } from './favs.service';
import { FavsController } from './favs.controller';
import { TracksModule } from '../tracks/tracks.module';
import { ArtistsModule } from '../artists/artists.module';
import { AlbumsModule } from '../albums/albums.module';

@Module({
  imports: [TracksModule, ArtistsModule, AlbumsModule, ArtistsModule],
  controllers: [FavsController],
  providers: [FavsService],
  exports: [FavsService],
})
export class FavsModule {}
