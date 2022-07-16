export interface IFavsDBController {
  getAll(): any;
  addTrack(id: string): void;
  removeTrack(id: string): void;
  addAlbum(id: string): void;
  removeAlbum(id: string): void;
  addArtist(id: string): void;
  removeArtist(id: string): void;
}

export class FavsDBController {
  private favs: any;

  constructor() {
    this.favs = {
      tracksIds: [],
      albumsIds: [],
      artistsIds: [],
    };

    this.getAll = this.getAll.bind(this);
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.addAlbum = this.addAlbum.bind(this);
    this.removeAlbum = this.removeAlbum.bind(this);
    this.addArtist = this.addArtist.bind(this);
    this.removeArtist = this.removeArtist.bind(this);
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
