import { Module } from '@nestjs/common';

import { DBModule } from '../db/db.module';
import { DeleteFieldService } from './delete-field.service';

@Module({
  imports: [DBModule],
  controllers: [],
  providers: [DeleteFieldService],
  exports: [DeleteFieldService],
})
export class DeleteFieldModule {}
