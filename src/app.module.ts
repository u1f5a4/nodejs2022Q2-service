import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './module/auth/auth.module';
import { UsersModule } from './module/users/users.module';
import { TracksModule } from './module/tracks/tracks.module';

@Module({
  imports: [UsersModule, AuthModule, TracksModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
