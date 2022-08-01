import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './module/auth/auth.module';
import { UsersModule } from './module/users/users.module';
import { TracksModule } from './module/tracks/tracks.module';
import { ArtistsModule } from './module/artists/artists.module';
import { AlbumsModule } from './module/albums/albums.module';
import { FavsModule } from './module/favs/favs.module';
import { DeleteFieldModule } from './module/delete-field/delete-field.module';
import { DBModule } from './module/db/db.module';
import typeormConfig from './typeorm.config';

@Module({
  imports: [
    UsersModule,
    AuthModule,
    TracksModule,
    ArtistsModule,
    AlbumsModule,
    FavsModule,
    DeleteFieldModule,
    DBModule,
    TypeOrmModule.forRoot(typeormConfig),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
