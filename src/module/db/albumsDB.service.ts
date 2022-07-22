import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AlbumEntity } from '../albums/entities/album.entity';

import { Album } from '../interfaces';

@Injectable()
export class AlbumsDB {
  constructor(
    @InjectRepository(AlbumEntity)
    private readonly albumRepository: Repository<AlbumEntity>,
  ) {}

  async create(album) {
    return await this.albumRepository.save(album);
  }

  async getAll() {
    return await this.albumRepository.find();
  }

  getById(id: string) {
    const album = this.albumRepository.findOne({ where: { id } });
    if (!album) return undefined;
    return album;
  }

  async update(id: string, album: Partial<Album>) {
    const oldAlbum = await this.getById(id);
    const newAlbum = { ...oldAlbum, ...album };

    const { affected } = await this.albumRepository.update(id, newAlbum);
    if (affected === 1) return newAlbum;
  }

  async delete(id: string) {
    const { affected } = await this.albumRepository.delete({ id });
    if (affected === 1) return true;
    return false;
  }

  async nullArtist(artistId: string) {
    const albums = await this.albumRepository.find({ where: { artistId } });
    for (const album of albums) {
      album.artistId = null;
      await this.albumRepository.save(album);
    }
  }
}
