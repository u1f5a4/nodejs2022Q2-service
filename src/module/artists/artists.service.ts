import { validate } from 'uuid';
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

  async create(createArtistDto: CreateArtistDto) {
    return await this.artistsDB.create(createArtistDto);
  }

  async getAll() {
    return await this.artistsDB.getAll();
  }

  async getById(id: string) {
    return await this.artistsDB.getById(id);
  }

  async update(id: string, updateArtistDto: UpdateArtistDto) {
    return await this.artistsDB.update(id, updateArtistDto);
  }

  async delete(id: string) {
    await this.deleteFieldService.deleteField('artist', id);
  }

  validateUUID(id: string) {
    return validate(id);
  }
}
