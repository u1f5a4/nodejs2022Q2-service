import { Injectable } from '@nestjs/common';

import { AlbumsService } from '../albums/albums.service';
import { ArtistsService } from '../artists/artists.service';
import { FavsDB } from '../db/favsDB.service';
import { Favorites } from '../interfaces';
import { TracksService } from '../tracks/tracks.service';

@Injectable()
export class FavsService {
  constructor(
    private readonly albumsService: AlbumsService,
    private readonly artistsService: ArtistsService,
    private readonly tracksService: TracksService,
    private readonly favsDB: FavsDB,
  ) {
    this.getAll = this.getAll.bind(this);
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.addAlbum = this.addAlbum.bind(this);
    this.removeAlbum = this.removeAlbum.bind(this);
    this.addArtist = this.addArtist.bind(this);
    this.removeArtist = this.removeArtist.bind(this);
  }

  getAll(): Favorites {
    const { tracksIds, artistsIds, albumsIds } = this.favsDB.getAll();

    const tracks = tracksIds
      .map((id: string) => this.tracksService.getById(id))
      .filter((track: any) => !!track);

    const artists = artistsIds
      .map((id: string) => this.artistsService.getById(id))
      .filter((artist: any) => !!artist);

    const albums = albumsIds
      .map((id: string) => this.albumsService.getById(id))
      .filter((album: any) => !!album);

    return { tracks, artists, albums };
  }

  addTrack(id: string) {
    this.favsDB.addTrack(id);
  }

  removeTrack(id: string) {
    this.favsDB.removeTrack(id);
  }

  addAlbum(id: string) {
    this.favsDB.addAlbum(id);
  }

  removeAlbum(id: string) {
    this.favsDB.removeAlbum(id);
  }

  addArtist(id: string) {
    this.favsDB.addArtist(id);
  }

  removeArtist(id: string) {
    this.favsDB.removeArtist(id);
  }
}
