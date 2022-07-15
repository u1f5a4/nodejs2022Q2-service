import { IUsersDBController, UsersDBController } from './users';
import { ITracksDBController, TracksDBController } from './tracks';
import { ArtistsDBController, IArtistsDBController } from './artists';
import { AlbumsDBController, IAlbumsDBController } from './albums';

export interface IDBController {
  usersController: IUsersDBController;
  tracksController: ITracksDBController;
  artistsController: IArtistsDBController;
  albumsController: IAlbumsDBController;
}

export class DBController implements IDBController {
  usersController: IDBController['usersController'];
  tracksController: IDBController['tracksController'];
  artistsController: IDBController['artistsController'];
  albumsController: IDBController['albumsController'];

  constructor(
    private readonly UsersDBController: UsersDBController,
    private readonly TracksDBController: TracksDBController,
    private readonly ArtistsDBController: ArtistsDBController,
    private readonly AlbumsDBController: AlbumsDBController,
  ) {
    this.usersController = {
      create: UsersDBController.create,
      getAll: UsersDBController.getAll,
      getById: UsersDBController.getById,
      changePassword: UsersDBController.changePassword,
      delete: UsersDBController.delete,
    };

    this.tracksController = {
      create: TracksDBController.create,
      getAll: TracksDBController.getAll,
      getById: TracksDBController.getById,
      update: TracksDBController.update,
      delete: TracksDBController.delete,
    };

    this.artistsController = {
      create: ArtistsDBController.create,
      getAll: ArtistsDBController.getAll,
      getById: ArtistsDBController.getById,
      update: ArtistsDBController.update,
      delete: ArtistsDBController.delete,
    };

    this.albumsController = {
      create: AlbumsDBController.create,
      getAll: AlbumsDBController.getAll,
      getById: AlbumsDBController.getById,
      update: AlbumsDBController.update,
      delete: AlbumsDBController.delete,
    };
  }
}

const usersController = new UsersDBController();
const tracksController = new TracksDBController();
const artistsController = new ArtistsDBController();
const albumsController = new AlbumsDBController();

export const dbController = new DBController(
  usersController,
  tracksController,
  artistsController,
  albumsController,
);
