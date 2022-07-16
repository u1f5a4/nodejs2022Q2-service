import { IUsersDBController, UsersDBController } from './users';
import { ITracksDBController, TracksDBController } from './tracks';
import { ArtistsDBController, IArtistsDBController } from './artists';
import { AlbumsDBController, IAlbumsDBController } from './albums';
import { FavsDBController, IFavsDBController } from './favs';

export interface IDBController {
  usersDBController: IUsersDBController;
  tracksDBController: ITracksDBController;
  artistsDBController: IArtistsDBController;
  albumsDBController: IAlbumsDBController;
  favsDBController: IFavsDBController;
}

export class DBController implements IDBController {
  usersDBController: IUsersDBController;
  tracksDBController: ITracksDBController;
  artistsDBController: IArtistsDBController;
  albumsDBController: IAlbumsDBController;
  favsDBController: IFavsDBController;

  constructor(
    private readonly UsersDBController: UsersDBController,
    private readonly TracksDBController: TracksDBController,
    private readonly ArtistsDBController: ArtistsDBController,
    private readonly AlbumsDBController: AlbumsDBController,
    private readonly FavsDBController: FavsDBController,
  ) {
    this.usersDBController = {
      create: UsersDBController.create,
      getAll: UsersDBController.getAll,
      getById: UsersDBController.getById,
      changePassword: UsersDBController.changePassword,
      delete: UsersDBController.delete,
    };

    this.tracksDBController = {
      create: TracksDBController.create,
      getAll: TracksDBController.getAll,
      getById: TracksDBController.getById,
      update: TracksDBController.update,
      delete: TracksDBController.delete,
      nullAlbum: TracksDBController.nullAlbum,
      nullArtist: TracksDBController.nullArtist,
    };

    this.artistsDBController = {
      create: ArtistsDBController.create,
      getAll: ArtistsDBController.getAll,
      getById: ArtistsDBController.getById,
      update: ArtistsDBController.update,
      delete: ArtistsDBController.delete,
    };

    this.albumsDBController = {
      create: AlbumsDBController.create,
      getAll: AlbumsDBController.getAll,
      getById: AlbumsDBController.getById,
      update: AlbumsDBController.update,
      delete: AlbumsDBController.delete,
      nullArtist: AlbumsDBController.nullArtist,
    };

    this.favsDBController = {
      getAll: FavsDBController.getAll,
      addTrack: FavsDBController.addTrack,
      removeTrack: FavsDBController.removeTrack,
      addAlbum: FavsDBController.addAlbum,
      removeAlbum: FavsDBController.removeAlbum,
      addArtist: FavsDBController.addArtist,
      removeArtist: FavsDBController.removeArtist,
    };
  }
}

const usersDBController = new UsersDBController();
const tracksDBController = new TracksDBController();
const artistsDBController = new ArtistsDBController();
const albumsDBController = new AlbumsDBController();
const favsDBController = new FavsDBController();

export const dbController = new DBController(
  usersDBController,
  tracksDBController,
  artistsDBController,
  albumsDBController,
  favsDBController,
);
