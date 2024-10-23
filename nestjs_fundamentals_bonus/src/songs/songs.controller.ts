import { Controller, Get, Post, Body, Param, Delete, HttpStatus, ParseIntPipe, Inject, Scope, Put, Query, DefaultValuePipe, UseGuards, Request } from '@nestjs/common';
import { SongsService } from './songs.service';
import { CreateSongDto } from './dto/create-song.dto';
import { UpdateSongDto } from './dto/update-song.dto';
import { Connection } from 'src/common/constants/connection';
import { Song } from './entities/song.entity';
import { DeleteResult, UpdateResult } from 'typeorm';
import { Pagination } from 'nestjs-typeorm-paginate';
import { ArtistJwtGuard } from 'src/auth/artists-jwt-guard';

// @Controller('songs')
@Controller({ path: 'songs', version: '1', scope: Scope.REQUEST }) //nestjs'de default singletondur asp.net core'da ise transienttir ve bunu otomatik yapar yani asp nestjsdeki gibi controller yaşam döngüsüne müdahaleye izin vermez
export class SongsController {

  constructor(private songsService: SongsService, @Inject('CONNECTION') private connection: Connection)// Connection token'ı ile enjekte ediliyor 
  { console.log(`THIS IS CONNECTION STRING ${this.connection.CONNECTION_STRING}`) }

  @Post()
  @UseGuards(ArtistJwtGuard)
  create(@Body() createSongDTO: CreateSongDto, @Request() request,): Promise<Song> {
    console.log(request.user);
    return this.songsService.create(createSongDTO);
  }

  // @Get()
  // findAll() {
  //   try {
  //     return this.songsService.findAll();
  //   } catch (e) {
  //     throw new HttpException('server error', HttpStatus.INTERNAL_SERVER_ERROR, { cause: e, });
  //   }
  // }
  @Get()
  findAll(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page = 1,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit = 10,
  ): Promise<Pagination<Song>> {
    limit = limit > 100 ? 100 : limit;
    return this.songsService.paginate({page,limit,});
  }

  @Get(':id')
  // findOne(@Param('id') id: string) { return this.songsService.findOne(+id) }
  // ParseIntPipe, gelen string değeri bir integer'a dönüştürür.
  // Eğer dönüştürme başarısız olursa, HTTP 406 (NOT_ACCEPTABLE) status kodu ile bir hata fırlatır.
  // ValidationPipe uygulamanın genelinde geçerli iken, ParseIntPipe belirli bir route parametresi için geçerlidir.
  findOne(@Param('id', new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE })) id: number): Promise<Song> {
    return this.songsService.findOne(id)
  }

  @Put(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updateSongDTO: UpdateSongDto,): Promise<UpdateResult> {
    return this.songsService.update(id, updateSongDTO);
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number): Promise<DeleteResult> {
    return this.songsService.remove(id);
  }
}
