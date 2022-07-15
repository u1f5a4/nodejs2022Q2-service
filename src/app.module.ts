import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './module/auth/auth.module';
import { UsersModule } from './module/users/users.module';
import { TracksModule } from './module/tracks/tracks.module';
import { ArtistsModule } from './module/artists/artists.module';

@Module({
  imports: [UsersModule, AuthModule, TracksModule, ArtistsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
