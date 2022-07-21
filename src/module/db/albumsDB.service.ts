import { Injectable } from '@nestjs/common';

import { Album } from '../interfaces';

@Injectable()
export class AlbumsDB {
  albums: Album[];

  constructor() {
    this.albums = [];
  }

  create(album: Album): Album {
    this.albums.push(album);
    return album;
  }

  getAll() {
    return this.albums;
  }

  getById(id: string) {
    return this.albums.find((album) => album.id === id);
  }

  update(id: string, album: Partial<Album>) {
    const albumIndex = this.albums.findIndex((album) => album.id === id);
    const oldAlbum = this.albums[albumIndex];
    const newAlbum = { ...oldAlbum, ...album };
    this.albums[albumIndex] = newAlbum;
    return this.albums[albumIndex];
  }

  delete(id: string) {
    const albumIndex = this.albums.findIndex((album) => album.id === id);
    this.albums.splice(albumIndex, 1);
  }

  nullArtist(artistId: string) {
    const albumIndex = this.albums.findIndex((a) => a.artistId === artistId);
    if (albumIndex === -1) return;

    this.albums[albumIndex].artistId = null;
  }
}
