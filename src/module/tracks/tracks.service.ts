import { v4 as uuid, validate } from 'uuid';
import { Injectable } from '@nestjs/common';

import { dbController, IDBController } from 'src/module/db/db';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';

@Injectable()
export class TracksService {
  tracksDBController: IDBController['tracksController'];

  constructor() {
    this.tracksDBController = dbController.tracksController;
  }

  create(createTrackDto: CreateTrackDto) {
    const newTrack = {
      ...createTrackDto,
      id: uuid(),
    };
    return this.tracksDBController.create(newTrack);
  }

  getAll() {
    return this.tracksDBController.getAll();
  }

  getById(id: string) {
    return this.tracksDBController.getById(id);
  }

  update(id: string, updateTrackDto: UpdateTrackDto) {
    return this.tracksDBController.update(id, updateTrackDto);
  }

  delete(id: string) {
    this.tracksDBController.delete(id);
  }

  validateUUID(id: string) {
    return validate(id);
  }
}
