import { v4 as uuid, validate } from 'uuid';
import { Injectable } from '@nestjs/common';

import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { dbController, IDBController } from '../db/db';

@Injectable()
export class AlbumsService {
  albumsDBController: IDBController['albumsController'];

  constructor() {
    this.albumsDBController = dbController.albumsController;
  }

  create(createAlbumDto: CreateAlbumDto) {
    const newAlbum = {
      id: uuid(),
      ...createAlbumDto,
    };
    return this.albumsDBController.create(newAlbum);
  }

  findAll() {
    return this.albumsDBController.getAll();
  }

  findOne(id: string) {
    return this.albumsDBController.getById(id);
  }

  update(id: string, updateAlbumDto: UpdateAlbumDto) {
    return this.albumsDBController.update(id, updateAlbumDto);
  }

  remove(id: string) {
    this.albumsDBController.delete(id);
  }

  validate(id: string) {
    return validate(id);
  }
}
