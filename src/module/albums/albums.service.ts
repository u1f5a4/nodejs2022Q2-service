import { validate } from 'uuid';
import { Injectable } from '@nestjs/common';

import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { DeleteFieldService } from '../delete-field/delete-field.service';
import { AlbumsDB } from '../db/albumsDB.service';

@Injectable()
export class AlbumsService {
  constructor(
    private readonly deleteFieldService: DeleteFieldService,
    private readonly albumsDB: AlbumsDB,
  ) {}

  create(createAlbumDto: CreateAlbumDto) {
    return this.albumsDB.create(createAlbumDto);
  }

  findAll() {
    return this.albumsDB.getAll();
  }

  async getById(id: string) {
    return await this.albumsDB.getById(id);
  }

  update(id: string, updateAlbumDto: UpdateAlbumDto) {
    return this.albumsDB.update(id, updateAlbumDto);
  }

  remove(id: string) {
    this.deleteFieldService.deleteField('album', id);
  }

  validateUUID(id: string) {
    return validate(id);
  }
}
