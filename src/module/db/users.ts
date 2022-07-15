import { User } from '../interfaces';
import { UpdatePasswordDto } from '../users/dto/update-password.dto';

export interface IUsersDBController {
  getAll: () => User[] | undefined;
  getById: (id: string) => User;
  create: (user: User) => User;
  changePassword: (id: string, dto: UpdatePasswordDto) => User;
  delete: (id: string) => void;
}

export class UsersDBController implements IUsersDBController {
  private users: User[];

  constructor() {
    this.users = [];

    this.getAll = this.getAll.bind(this);
    this.getById = this.getById.bind(this);
    this.create = this.create.bind(this);
    this.changePassword = this.changePassword.bind(this);
    this.delete = this.delete.bind(this);
  }

  create(user: User): User {
    this.users.push(user);
    return this.getById(user.id);
  }

  getAll(): User[] {
    if (this.users.length === 0) return undefined;
    return this.users.map((user) => {
      return this.removePasswordField(user);
    });
  }

  getById(id: string): User | undefined {
    const user = this.users.find((user) => user.id === id);
    if (!user) return undefined;
    return this.removePasswordField(user);
  }

  changePassword(id: string, updatePasswordDto: UpdatePasswordDto): User {
    const { oldPassword, newPassword } = updatePasswordDto;

    const userIndex = this.users.findIndex((user) => user.id === id);
    const user = this.users[userIndex];

    if (user.password !== oldPassword)
      throw new Error('Old password is incorrect');

    user.updatedAt = Date.now();
    user.password = newPassword;
    return this.removePasswordField(user);
  }

  delete(id: string): boolean {
    const userIndex = this.users.findIndex((user) => user.id === id);
    if (userIndex === -1) return false;
    this.users.splice(userIndex, 1);
    return true;
  }

  removePasswordField(user: User): User {
    const copyUser = { ...user };
    delete copyUser.password;
    return copyUser;
  }
}
