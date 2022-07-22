import { validate } from 'uuid';
import { Injectable } from '@nestjs/common';

import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { DeleteFieldService } from '../delete-field/delete-field.service';
import { TracksDB } from '../db/tracksDB.service';

@Injectable()
export class TracksService {
  constructor(
    private readonly deleteFieldService: DeleteFieldService,
    private readonly tracksDB: TracksDB,
  ) {}

  create(createTrackDto: CreateTrackDto) {
    return this.tracksDB.create(createTrackDto);
  }

  getAll() {
    return this.tracksDB.getAll();
  }

  async getById(id: string) {
    return await this.tracksDB.getById(id);
  }

  update(id: string, updateTrackDto: UpdateTrackDto) {
    return this.tracksDB.update(id, updateTrackDto);
  }

  delete(id: string) {
    this.deleteFieldService.deleteField('track', id);
  }

  validateUUID(id: string) {
    return validate(id);
  }
}
