import { validate } from 'uuid';
import { Injectable } from '@nestjs/common';

import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { DeleteFieldService } from '../../module/delete-field/delete-field.service';
import { AlbumsDB } from '../../module/db/albumsDB.service';

@Injectable()
export class AlbumsService {
  constructor(
    private readonly deleteFieldService: DeleteFieldService,
    private readonly albumsDB: AlbumsDB,
  ) {}

  async create(createAlbumDto: CreateAlbumDto) {
    return await this.albumsDB.create(createAlbumDto);
  }

  async findAll() {
    return await this.albumsDB.getAll();
  }

  async getById(id: string) {
    return await this.albumsDB.getById(id);
  }

  async update(id: string, updateAlbumDto: UpdateAlbumDto) {
    return await this.albumsDB.update(id, updateAlbumDto);
  }

  async remove(id: string) {
    await this.deleteFieldService.deleteField('album', id);
  }

  validateUUID(id: string) {
    return validate(id);
  }
}
