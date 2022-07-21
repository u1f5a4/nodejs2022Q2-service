import { Module } from '@nestjs/common';

import { ArtistsService } from './artists.service';
import { ArtistsController } from './artists.controller';
import { DeleteFieldModule } from '../delete-field/delete-field.module';
import { DBModule } from '../db/db.module';

@Module({
  imports: [DeleteFieldModule, DBModule],
  controllers: [ArtistsController],
  providers: [ArtistsService],
  exports: [ArtistsService],
})
export class ArtistsModule {}
