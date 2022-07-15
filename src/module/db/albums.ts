import { Album } from '../interfaces';

export interface IAlbumsDBController {
  create: (album: Album) => Album;
  getAll: () => Album[] | undefined;
  getById: (id: string) => Album;
  update: (id: string, album: Partial<Album>) => Album;
  delete: (id: string) => void;
}

export class AlbumsDBController implements IAlbumsDBController {
  albums: Album[];

  constructor() {
    this.albums = [];

    this.create = this.create.bind(this);
    this.getAll = this.getAll.bind(this);
    this.getById = this.getById.bind(this);
    this.update = this.update.bind(this);
    this.delete = this.delete.bind(this);
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
}
