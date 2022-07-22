import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ArtistEntity } from '../artists/entities/artist.entity';

import { Artist } from '../interfaces';

@Injectable()
export class ArtistsDB {
  constructor(
    @InjectRepository(ArtistEntity)
    private readonly artistRepository: Repository<ArtistEntity>,
  ) {}

  async create(artist) {
    return await this.artistRepository.save(artist);
  }

  async getAll() {
    return await this.artistRepository.find();
  }

  async getById(id: string) {
    const artist = await this.artistRepository.findOne({ where: { id } });
    if (!artist) return undefined;
    return artist;
  }

  async update(id: string, artist: Partial<Artist>) {
    const oldArtist = this.getById(id);
    const newArtist = { id, ...oldArtist, ...artist };

    const { affected } = await this.artistRepository.update(id, newArtist);
    if (affected) return newArtist;
    throw new Error('Artist not found');
  }

  async delete(id: string) {
    return await this.artistRepository.delete({ id });
  }
}
