import { Module, ValidationPipe } from '@nestjs/common';
import { TracksService } from './tracks.service';
import { TracksController } from './tracks.controller';
import { APP_PIPE } from '@nestjs/core';

@Module({
  controllers: [TracksController],
  providers: [
    TracksService,
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },
  ],
})
export class TracksModule {}
