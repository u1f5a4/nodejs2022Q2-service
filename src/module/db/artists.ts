import { Artist } from '../interfaces';

export interface IArtistsDBController {
  create: (artist: Artist) => Artist;
  getAll: () => Artist[] | undefined;
  getById: (id: string) => Artist;
  update: (id: string, artist: Partial<Artist>) => Artist;
  delete: (id: string) => void;
}

export class ArtistsDBController implements IArtistsDBController {
  artists: Artist[];

  constructor() {
    this.artists = [];

    this.create = this.create.bind(this);
    this.getAll = this.getAll.bind(this);
    this.getById = this.getById.bind(this);
    this.update = this.update.bind(this);
    this.delete = this.delete.bind(this);
  }

  getAll() {
    return this.artists;
  }

  getById(id: string) {
    return this.artists.find((artist) => artist.id === id);
  }

  create(artist: Artist) {
    this.artists.push(artist);
    return artist;
  }

  update(id: string, artist: Partial<Artist>) {
    const artistIndex = this.artists.findIndex((artist) => artist.id === id);
    const oldArtist = this.artists[artistIndex];
    const newArtist = { ...oldArtist, ...artist };
    this.artists[artistIndex] = newArtist;
    return this.artists[artistIndex];
  }

  delete(id: string) {
    const artistIndex = this.artists.findIndex((artist) => artist.id === id);
    this.artists.splice(artistIndex, 1);
  }
}
