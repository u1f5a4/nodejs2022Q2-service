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
    // this.deleteField = this.deleteField.bind(this);
  }

  async deleteField(field: string, id: string) {
    switch (field) {
      case 'track':
        this.tracksDB.delete(id);
        this.favsDB.removeTrack(id);
        break;

      case 'album':
        this.albumsDB.delete(id);
        this.tracksDB.nullAlbum(id);
        this.favsDB.removeAlbum(id);
        break;

      case 'artist':
        this.artistsDB.delete(id);
        this.tracksDB.nullArtist(id);
        this.albumsDB.nullArtist(id);
        this.favsDB.removeArtist(id);
        break;

      default:
        throw new Error('Invalid field');
    }
  }
}
