import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './endpoints/auth/auth.module';
import { UsersModule } from './endpoints/users/users.module';
import { TracksModule } from './endpoints/tracks/tracks.module';
import { ArtistsModule } from './endpoints/artists/artists.module';
import { AlbumsModule } from './endpoints/albums/albums.module';
import { FavsModule } from './endpoints/favs/favs.module';
import { DeleteFieldModule } from './module/delete-field/delete-field.module';
import { DBModule } from './module/db/db.module';
import typeormConfig from './module/typeorm/typeorm.config';
import { LoggerModule } from './module/logger/logger.module';
import { Logger } from './module/logger/logger.service';

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
    LoggerModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(Logger).forRoutes('*');
  }
}
