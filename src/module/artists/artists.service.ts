import { v4 as uuid, validate } from 'uuid';
import { Injectable } from '@nestjs/common';

import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { DeleteFieldService } from '../delete-field/delete-field.service';
import { ArtistsDB } from '../db/artistsDB.service';

@Injectable()
export class ArtistsService {
  constructor(
    private readonly deleteFieldService: DeleteFieldService,
    private readonly artistsDB: ArtistsDB,
  ) {}

  create(createArtistDto: CreateArtistDto) {
    const artist = {
      id: uuid(),
      ...createArtistDto,
    };
    return this.artistsDB.create(artist);
  }

  getAll() {
    return this.artistsDB.getAll();
  }

  getById(id: string) {
    return this.artistsDB.getById(id);
  }

  update(id: string, updateArtistDto: UpdateArtistDto) {
    return this.artistsDB.update(id, updateArtistDto);
  }

  delete(id: string) {
    this.deleteFieldService.deleteField('artist', id);
  }

  validateUUID(id: string) {
    return validate(id);
  }
}
