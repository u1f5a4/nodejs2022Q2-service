import { Track } from '../interfaces';

export interface ITracksDBController {
  getAll: () => Track[] | undefined;
  getById: (id: string) => Track;
  create: (track: Track) => Track;
  update: (id: string, track: Partial<Track>) => Track;
  delete: (id: string) => void;
}

export class TracksDBController implements ITracksDBController {
  tracks: Track[];

  constructor() {
    this.tracks = [];

    this.create = this.create.bind(this);
    this.getAll = this.getAll.bind(this);
    this.getById = this.getById.bind(this);
    this.update = this.update.bind(this);
    this.delete = this.delete.bind(this);
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
}
