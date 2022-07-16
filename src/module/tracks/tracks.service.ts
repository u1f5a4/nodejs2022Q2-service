import { v4 as uuid, validate } from 'uuid';
import { Injectable } from '@nestjs/common';

import { dbController, IDBController } from 'src/module/db/db';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { DeleteFieldService } from '../delete-field/delete-field.service';

@Injectable()
export class TracksService {
  tracksDBController: IDBController['tracksDBController'];

  constructor(private readonly deleteFieldService: DeleteFieldService) {
    this.tracksDBController = dbController.tracksDBController;
  }

  create(createTrackDto: CreateTrackDto) {
    const newTrack = {
      id: uuid(),
      ...createTrackDto,
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
    this.deleteFieldService.deleteField('track', id);
  }

  validateUUID(id: string) {
    return validate(id);
  }
}
