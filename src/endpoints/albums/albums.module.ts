import { Module } from '@nestjs/common';

import { AlbumsService } from './albums.service';
import { AlbumsController } from './albums.controller';
import { DeleteFieldModule } from '../../module/delete-field/delete-field.module';
import { DBModule } from '../../module/db/db.module';

@Module({
  imports: [DeleteFieldModule, DBModule],
  controllers: [AlbumsController],
  providers: [AlbumsService],
  exports: [AlbumsService],
})
export class AlbumsModule {}
