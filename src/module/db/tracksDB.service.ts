import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Track } from '../interfaces';
import { CreateTrackDto } from '../tracks/dto/create-track.dto';
import { TrackEntity } from '../tracks/entities/track.entity';

@Injectable()
export class TracksDB {
  constructor(
    @InjectRepository(TrackEntity)
    private readonly trackRepository: Repository<TrackEntity>,
  ) {}

  async create(trackData: CreateTrackDto) {
    return await this.trackRepository.save(trackData);
  }

  async getAll() {
    return await this.trackRepository.find();
  }

  async getById(id: string) {
    const track = await this.trackRepository.findOne({ where: { id } });
    if (!track) return undefined;
    return track;
  }

  async update(id: string, trackData: Partial<Track>) {
    const track = await this.getById(id);
    const newTrack = { ...track, ...trackData };

    const { affected } = await this.trackRepository.update(id, newTrack);
    if (affected === 1) return newTrack;
  }

  async delete(id: string) {
    await this.trackRepository.delete({ id });
  }

  async nullArtist(artistId: string) {
    const tracks = await this.trackRepository.find({ where: { artistId } });
    for (const track of tracks) {
      track.artistId = null;
      await this.trackRepository.save(track);
    }
  }

  async nullAlbum(albumId: string) {
    const tracks = await this.trackRepository.find({ where: { albumId } });
    for (const track of tracks) {
      track.albumId = null;
      await this.trackRepository.save(track);
    }
  }
}
