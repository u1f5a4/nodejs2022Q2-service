import { Module } from '@nestjs/common';

import { DeleteFieldService } from './delete-field.service';

@Module({
  imports: [],
  controllers: [],
  providers: [DeleteFieldService],
  exports: [DeleteFieldService],
})
export class DeleteFieldModule {}
