import { Module } from '@nestjs/common';

import { TracksService } from './tracks.service';
import { TracksController } from './tracks.controller';
import { DeleteFieldModule } from '../delete-field/delete-field.module';
import { DBModule } from '../db/db.module';

@Module({
  imports: [DeleteFieldModule, DBModule],
  controllers: [TracksController],
  providers: [TracksService],
  exports: [TracksService],
})
export class TracksModule {}
