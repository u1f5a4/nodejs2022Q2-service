import { validate } from 'uuid';
import { Injectable } from '@nestjs/common';

import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { DeleteFieldService } from '../../module/delete-field/delete-field.service';
import { TracksDB } from '../../module/db/tracksDB.service';

@Injectable()
export class TracksService {
  constructor(
    private readonly deleteFieldService: DeleteFieldService,
    private readonly tracksDB: TracksDB,
  ) {}

  async create(createTrackDto: CreateTrackDto) {
    return await this.tracksDB.create(createTrackDto);
  }

  async getAll() {
    return await this.tracksDB.getAll();
  }

  async getById(id: string) {
    return await this.tracksDB.getById(id);
  }

  async update(id: string, updateTrackDto: UpdateTrackDto) {
    return await this.tracksDB.update(id, updateTrackDto);
  }

  async delete(id: string) {
    await this.deleteFieldService.deleteField('track', id);
  }

  validateUUID(id: string) {
    return validate(id);
  }
}
