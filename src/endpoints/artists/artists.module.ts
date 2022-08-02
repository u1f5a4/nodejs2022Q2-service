import { Module } from '@nestjs/common';

import { ArtistsService } from './artists.service';
import { ArtistsController } from './artists.controller';
import { DeleteFieldModule } from '../../module/delete-field/delete-field.module';
import { DBModule } from '../../module/db/db.module';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [DeleteFieldModule, DBModule, AuthModule],
  controllers: [ArtistsController],
  providers: [ArtistsService],
  exports: [ArtistsService],
})
export class ArtistsModule {}
