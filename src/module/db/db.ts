import { IUsersDBController, UsersDBController } from './users';
import { ITracksDBController, TracksDBController } from './tracks';
import { ArtistsDBController, IArtistsDBController } from './artists';

export interface IDBController {
  usersController: IUsersDBController;
  tracksController: ITracksDBController;
  artistsController: IArtistsDBController;
}

export class DBController implements IDBController {
  usersController: IDBController['usersController'];
  tracksController: IDBController['tracksController'];
  artistsController: IDBController['artistsController'];

  constructor(
    private readonly UsersDBController: UsersDBController,
    private readonly TracksDBController: TracksDBController,
    private readonly ArtistsDBController: ArtistsDBController,
  ) {
    this.usersController = {
      getAll: UsersDBController.getAll,
      getById: UsersDBController.getById,
      create: UsersDBController.create,
      changePassword: UsersDBController.changePassword,
      delete: UsersDBController.delete,
    };

    this.tracksController = {
      getAll: TracksDBController.getAll,
      getById: TracksDBController.getById,
      create: TracksDBController.create,
      update: TracksDBController.update,
      delete: TracksDBController.delete,
    };

    this.artistsController = {
      getAll: ArtistsDBController.getAll,
      getById: ArtistsDBController.getById,
      create: ArtistsDBController.create,
      update: ArtistsDBController.update,
      delete: ArtistsDBController.delete,
    };
  }
}

const usersController = new UsersDBController();
const tracksController = new TracksDBController();
const artistsController = new ArtistsDBController();

export const dbController = new DBController(
  usersController,
  tracksController,
  artistsController,
);
