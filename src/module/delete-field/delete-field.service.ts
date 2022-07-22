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
  ) {}

  async deleteField(field: string, id: string) {
    switch (field) {
      case 'track':
        await this.tracksDB.delete(id);
        await this.favsDB.removeTrack(id);
        break;

      case 'album':
        await this.albumsDB.delete(id);
        await this.tracksDB.nullAlbum(id);
        await this.favsDB.removeAlbum(id);
        break;

      case 'artist':
        await this.artistsDB.delete(id);
        await this.tracksDB.nullArtist(id);
        await this.albumsDB.nullArtist(id);
        await this.favsDB.removeArtist(id);
        break;

      default:
        throw new Error('Invalid field');
    }
  }
}
