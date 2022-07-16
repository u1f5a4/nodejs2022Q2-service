import { Injectable } from '@nestjs/common';

import { dbController, IDBController } from '../db/db';

@Injectable()
export class DeleteFieldService {
  dbController: IDBController;

  constructor() {
    this.dbController = dbController;

    this.deleteField = this.deleteField.bind(this);
  }

  deleteField(field: string, id: string) {
    const {
      albumsDBController,
      favsDBController,
      tracksDBController,
      artistsDBController,
    } = this.dbController;

    console.log(`Deleting ${field} with id ${id}`);
    switch (field) {
      case 'track':
        tracksDBController.delete(id);
        favsDBController.removeTrack(id);
        break;

      case 'album':
        albumsDBController.delete(id);
        tracksDBController.nullAlbum(id);
        favsDBController.removeAlbum(id);
        break;

      case 'artist':
        artistsDBController.delete(id);
        tracksDBController.nullArtist(id);
        albumsDBController.nullArtist(id);
        favsDBController.removeArtist(id);
        break;

      default:
        throw new Error('Invalid field');
    }
  }
}
