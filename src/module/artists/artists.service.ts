import { v4 as uuid, validate } from 'uuid';
import { Injectable } from '@nestjs/common';

import { dbController, IDBController } from '../db/db';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';

@Injectable()
export class ArtistsService {
  artistsDBController: IDBController['artistsController'];

  constructor() {
    this.artistsDBController = dbController.artistsController;
  }

  create(createArtistDto: CreateArtistDto) {
    const artist = {
      id: uuid(),
      ...createArtistDto,
    };
    return this.artistsDBController.create(artist);
  }

  getAll() {
    return this.artistsDBController.getAll();
  }

  getById(id: string) {
    return this.artistsDBController.getById(id);
  }

  update(id: string, updateArtistDto: UpdateArtistDto) {
    return this.artistsDBController.update(id, updateArtistDto);
  }

  delete(id: string) {
    this.artistsDBController.delete(id);
  }

  validateUUID(id: string) {
    return validate(id);
  }
}
