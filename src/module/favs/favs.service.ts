import { Injectable } from '@nestjs/common';

import { AlbumsService } from '../albums/albums.service';
import { ArtistsService } from '../artists/artists.service';
import { FavsDB } from '../db/favsDB.service';
import { TracksService } from '../tracks/tracks.service';

@Injectable()
export class FavsService {
  constructor(
    private readonly albumsService: AlbumsService,
    private readonly artistsService: ArtistsService,
    private readonly tracksService: TracksService,
    private readonly favsDB: FavsDB,
  ) {}

  async getAll() {
    // !Hardcode userId
    const userId = '1';

    const { tracksIds, artistsIds, albumsIds } = await this.favsDB.getAll(
      userId,
    );

    const tracks = tracksIds
      .map((id: string) => this.tracksService.getById(id))
      .filter((track: any) => !!track);

    const artists = artistsIds
      .map((id: string) => this.artistsService.getById(id))
      .filter((artist: any) => !!artist);

    const albums = albumsIds
      .map((id: string) => this.albumsService.getById(id))
      .filter((album: any) => !!album);

    return {
      tracks: await Promise.all(tracks),
      artists: await Promise.all(artists),
      albums: await Promise.all(albums),
    };
  }

  async addTrack(id: string) {
    await this.favsDB.addTrack(id);
  }

  async removeTrack(id: string) {
    await this.favsDB.removeTrack(id);
  }

  async addAlbum(id: string) {
    await this.favsDB.addAlbum(id);
  }

  async removeAlbum(id: string) {
    await this.favsDB.removeAlbum(id);
  }

  async addArtist(id: string) {
    await this.favsDB.addArtist(id);
  }

  async removeArtist(id: string) {
    await this.favsDB.removeArtist(id);
  }
}
