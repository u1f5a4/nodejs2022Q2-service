import { Injectable } from '@nestjs/common';

@Injectable()
export class FavsDB {
  private favs: any;

  constructor() {
    this.favs = {
      tracksIds: [],
      albumsIds: [],
      artistsIds: [],
    };
  }

  public getAll() {
    return this.favs;
  }

  public addTrack(id: string) {
    this.favs.tracksIds.push(id);
  }

  public removeTrack(id: string) {
    if (!this.favs.tracksIds.includes(id)) return;
    this.favs.tracksIds = this.favs.tracksIds.filter(
      (track: string) => track !== id,
    );
  }

  public addAlbum(id: string) {
    this.favs.albumsIds.push(id);
  }

  public removeAlbum(id: string) {
    if (!this.favs.albumsIds.includes(id)) return;
    this.favs.albumsIds = this.favs.albumsIds.filter(
      (album: string) => album !== id,
    );
  }

  public addArtist(id: string) {
    this.favs.artistsIds.push(id);
  }

  public removeArtist(id: string) {
    if (!this.favs.artistsIds.includes(id)) return;
    this.favs.artistsIds = this.favs.artistsIds.filter(
      (artist: string) => artist !== id,
    );
  }
}
