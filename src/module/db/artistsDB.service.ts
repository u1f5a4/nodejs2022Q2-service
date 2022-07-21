import { Injectable } from '@nestjs/common';

import { Artist } from '../interfaces';

@Injectable()
export class ArtistsDB {
  artists: Artist[];

  constructor() {
    this.artists = [];
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
