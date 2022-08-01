import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { DBModule } from '../../module/db/db.module';

@Module({
  imports: [
    DBModule,
    JwtModule.register({ secret: process.env.JWT_SECRET_KEY }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
