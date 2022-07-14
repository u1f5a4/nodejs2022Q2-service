import { Track, User } from '../interfaces';
import { UpdatePasswordDto } from '../users/dto/update-password.dto';
import { UsersDBController } from './users';
import { TracksDBController } from './tracks';

export interface IDBController {
  usersController: {
    getAll: () => User[] | undefined;
    getById: (id: string) => User;
    create: (user: User) => User;
    changePassword: (id: string, dto: UpdatePasswordDto) => User;
    delete: (id: string) => void;
  };
  tracksController: {
    getAll: () => Track[] | undefined;
    getById: (id: string) => Track;
    create: (track: Track) => Track;
    update: (id: string, track: Partial<Track>) => Track;
    delete: (id: string) => void;
  };
}

export class DBController implements IDBController {
  usersController: IDBController['usersController'];
  tracksController: IDBController['tracksController'];

  constructor(
    private readonly UsersDBController: UsersDBController,
    private readonly TracksDBController: TracksDBController,
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
  }
}

const usersController = new UsersDBController();
const tracksController = new TracksDBController();
export const dbController = new DBController(usersController, tracksController);
