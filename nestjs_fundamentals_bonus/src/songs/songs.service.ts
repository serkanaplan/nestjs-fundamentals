import { Injectable, Scope } from '@nestjs/common';
import { CreateSongDto } from './dto/create-song.dto';
import { UpdateSongDto } from './dto/update-song.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Song } from './entities/song.entity';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { IPaginationOptions, paginate, Pagination } from 'nestjs-typeorm-paginate';
import { Artist } from 'src/artists/artist.entity';

// Singleton (Varsayılan): Provider uygulama boyunca tek bir örnek olarak kalır ve aynı örnek tüm uygulama tarafından kullanılır.
// Request Scoped: Her HTTP isteği için provider'ın yeni bir örneği oluşturulur.
// Transient Scoped: Provider her ihtiyaç duyulduğunda, yani her kullanımda yeni bir örnek oluşturulur.
// @Injectable()
// @Injectable({scope: Scope.TRANSIENT,})
@Injectable({ scope: Scope.REQUEST, })
export class SongsService {

  constructor(
  @InjectRepository(Song) private songsRepository: Repository<Song>,    
  @InjectRepository(Artist) private artistsRepository: Repository<Artist>) { }

  async create(songDTO: CreateSongDto): Promise<Song> {
    const song = new Song();
    song.title = songDTO.title;
    song.artists = songDTO.artists;
    song.duration = songDTO.duration;
    song.lyrics = songDTO.lyrics;
    song.releasedDate = songDTO.releasedDate;

    console.log(songDTO.artists);

    
    const artists = await this.artistsRepository.findByIds(songDTO.artists);
    console.log(artists);
    song.artists = artists;

    return this.songsRepository.save(song);
  }

  // findAll() { return this.songs; }
  // findAll() {
  //   throw new Error('Error in Db whil fetching record');
  //   return this.songs;
  // }
  findAll(): Promise<Song[]> {
    return this.songsRepository.find();
  }

  findOne(id: number): Promise<Song> {
    return this.songsRepository.findOneBy({ id });
  }

  update(id: number, recordToUpdate: UpdateSongDto): Promise<UpdateResult> {
    return this.songsRepository.update(id, recordToUpdate);
  }

  remove(id: number): Promise<DeleteResult> {
    return this.songsRepository.delete(id);
  }

  
  async paginate(options: IPaginationOptions): Promise<Pagination<Song>> {
    const queryBuilder = this.songsRepository.createQueryBuilder('c');
    queryBuilder.orderBy('c.releasedDate', 'DESC');

    return paginate<Song>(queryBuilder, options);
  }
}
