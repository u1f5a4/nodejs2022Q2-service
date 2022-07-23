import { Injectable } from '@nestjs/common';
import { AlbumsService } from '../albums/albums.service';
import { ArtistsService } from '../artists/artists.service';
import { dbController, IDBController } from '../db/db';
import { Favorites } from '../interfaces';
import { TracksService } from '../tracks/tracks.service';

@Injectable()
export class FavsService {
  favsDBController: IDBController['favsDBController'];

  constructor(
    private readonly albumsService: AlbumsService,
    private readonly artistsService: ArtistsService,
    private readonly tracksService: TracksService,
  ) {
    this.favsDBController = dbController.favsDBController;

    this.getAll = this.getAll.bind(this);
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.addAlbum = this.addAlbum.bind(this);
    this.removeAlbum = this.removeAlbum.bind(this);
    this.addArtist = this.addArtist.bind(this);
    this.removeArtist = this.removeArtist.bind(this);
  }

  getAll(): Favorites {
    const { tracksIds, artistsIds, albumsIds } = this.favsDBController.getAll();

    const tracks = tracksIds
      .map((id: string) => this.tracksService.getById(id))
      .filter((track: any) => !!track);

    const artists = artistsIds
      .map((id: string) => this.artistsService.getById(id))
      .filter((artist: any) => !!artist);

    const albums = albumsIds
      .map((id: string) => this.albumsService.getById(id))
      .filter((album: any) => !!album);

    console.log(albums);
    return { tracks, artists, albums };
  }

  addTrack(id: string) {
    this.favsDBController.addTrack(id);
  }

  removeTrack(id: string) {
    this.favsDBController.removeTrack(id);
  }

  addAlbum(id: string) {
    this.favsDBController.addAlbum(id);
  }

  removeAlbum(id: string) {
    this.favsDBController.removeAlbum(id);
  }

  addArtist(id: string) {
    this.favsDBController.addArtist(id);
  }

  removeArtist(id: string) {
    this.favsDBController.removeArtist(id);
  }
}
