import { Module, ValidationPipe } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { APP_PIPE } from '@nestjs/core';

@Module({
  controllers: [UsersController],
  providers: [
    UsersService,
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },
  ],
})
export class UsersModule {}
