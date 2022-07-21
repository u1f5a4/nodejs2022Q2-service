import { Injectable } from '@nestjs/common';

import { Track } from '../interfaces';

@Injectable()
export class TracksDB {
  private tracks: Track[];

  constructor() {
    this.tracks = [];
  }

  create(trackData: Track): Track {
    this.tracks.push(trackData);
    return trackData;
  }

  getAll() {
    return this.tracks;
  }

  getById(id: string) {
    return this.tracks.find((track) => track.id === id);
  }

  update(id: string, trackData: Partial<Track>): Track {
    const trackIndex = this.tracks.findIndex((track) => track.id === id);
    if (trackIndex === -1) return;

    const oldTrack = this.tracks[trackIndex];
    const newTrack = { ...oldTrack, ...trackData };
    this.tracks[trackIndex] = newTrack;
    return this.tracks[trackIndex];
  }

  delete(id: string): void {
    const trackIndex = this.tracks.findIndex((track) => track.id === id);
    if (trackIndex === -1) return;

    this.tracks.splice(trackIndex, 1);
  }

  nullArtist(artistId: string) {
    const trackIndex = this.tracks.findIndex((t) => t.artistId === artistId);
    if (trackIndex === -1) return;

    this.tracks[trackIndex].artistId = null;
  }

  nullAlbum(albumId: string) {
    const trackIndex = this.tracks.findIndex((t) => t.albumId === albumId);
    if (trackIndex === -1) return;

    const { id } = this.tracks[trackIndex];
    this.update(id, { albumId: null });
  }
}
