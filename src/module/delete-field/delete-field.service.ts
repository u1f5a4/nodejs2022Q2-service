import { Injectable } from '@nestjs/common';

import { AlbumsDB } from '../db/albumsDB.service';
import { ArtistsDB } from '../db/artistsDB.service';
import { FavsDB } from '../db/favsDB.service';
import { TracksDB } from '../db/tracksDB.service';

@Injectable()
export class DeleteFieldService {
  constructor(
    private readonly albumsDB: AlbumsDB,
    private readonly favsDB: FavsDB,
    private readonly tracksDB: TracksDB,
    private readonly artistsDB: ArtistsDB,
  ) {
    this.deleteField = this.deleteField.bind(this);
  }

  deleteField(field: string, id: string) {
    const albumsDBController = this.albumsDB;
    const favsDBController = this.favsDB;
    const tracksDBController = this.tracksDB;
    const artistsDBController = this.artistsDB;

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
