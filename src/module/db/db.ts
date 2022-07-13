import { User } from '../interfaces';
import { UpdatePasswordDto } from '../users/dto/update-password.dto';
import { UsersDBController } from './users';

export interface IDBController {
  usersController: {
    getAll: () => User[] | undefined;
    getById: (id: string) => User;
    create: (user: User) => User;
    changePassword: (id: string, dto: UpdatePasswordDto) => User;
    delete: (id: string) => void;
  };
}

export class DBController implements IDBController {
  usersController: IDBController['usersController'];

  constructor(private readonly UsersDBController: UsersDBController) {
    this.usersController = {
      getAll: UsersDBController.getAll,
      getById: UsersDBController.getById,
      create: UsersDBController.create,
      changePassword: UsersDBController.changePassword,
      delete: UsersDBController.delete,
    };
  }
}

const usersController = new UsersDBController();
export const dbController = new DBController(usersController);
