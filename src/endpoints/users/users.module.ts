import { Module } from '@nestjs/common';

import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { DBModule } from '../../module/db/db.module';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [DBModule, AuthModule],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
