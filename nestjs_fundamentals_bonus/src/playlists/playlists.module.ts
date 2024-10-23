import { Module } from '@nestjs/common';
import { PlayListsController } from './playlists.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Playlist } from './playlist.entity';
import { PlayListsService } from './playlists.service';
import { User } from 'src/users/user.entity';
import { Song } from 'src/songs/entities/song.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Playlist, Song, User])],
  controllers: [PlayListsController],
  providers: [PlayListsService],
})
export class PlayListModule {}
