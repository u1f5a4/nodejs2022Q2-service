import { Track } from '../interfaces';

export interface ITracksDBController {
  create: (track: Track) => Track;
  getAll: () => Track[] | undefined;
  getById: (id: string) => Track;
  update: (id: string, track: Partial<Track>) => Track;
  delete: (id: string) => void;
  nullAlbum: (id: string) => void;
  nullArtist: (id: string) => void;
}

export class TracksDBController implements ITracksDBController {
  private tracks: Track[];

  constructor() {
    this.tracks = [];

    this.create = this.create.bind(this);
    this.getAll = this.getAll.bind(this);
    this.getById = this.getById.bind(this);
    this.update = this.update.bind(this);
    this.delete = this.delete.bind(this);
    this.nullAlbum = this.nullAlbum.bind(this);
    this.nullArtist = this.nullArtist.bind(this);
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
