import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SongsModule } from './songs/songs.module';
import { LoggerMiddleware } from './common/middlewares/logger.middleware';
import { SongsController } from './songs/songs.controller';
import { DevConfigService } from './common/providers/DevConfigService';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Song } from './songs/entities/song.entity';
import { Artist } from './artists/artist.entity';
import { User } from './users/user.entity';
import { PlayListModule } from './playlists/playlists.module';
import { Playlist } from './playlists/playlist.entity';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ArtistsModule } from './artists/artists.module';

const devConfig = { port: 3000 };
const proConfig = { port: 4000 };
const config = { port: 5000 };

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      database: 'spotify-clone',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'Passw0rd',
      entities: [Song, Artist, User, Playlist],
      synchronize: true,
    }),
    SongsModule,
    PlayListModule,
    AuthModule,
    UsersModule,
  ArtistsModule],
  controllers: [AppController],
  providers: [
    // {provider: AppService, useClass: AppService}], //  [AppService] ile aynıdır o yüzden aşağıdaki yapıyı kullan
    AppService,

    // { provide: DevConfigService, useClass: DevConfigService },
    DevConfigService,

    // useFactory dinamik bir değer oluşturmak için kullanılır. iki farklı konfigürasyondan birini döndürüyor
    { provide: 'CONFIGDYNAMIC', useFactory: () => { return process.env.NODE_ENV === 'development' ? devConfig : proConfig; } },

    // Eğer dinamik bir değer yerine sabit bir değer kullanmak isteseydik, useFactory yerine useValue kullanabilirdik. 
    { provide: 'CONFIG', useValue: config }
  ]
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    // consumer.apply(LoggerMiddleware).forRoutes('songs'); // option no 1
    // consumer.apply(LoggerMiddleware).forRoutes({ path: 'songs', method: RequestMethod.POST }); //option no 2
    consumer.apply(LoggerMiddleware).forRoutes(SongsController); //option no 3}
  }
}