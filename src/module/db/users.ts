import { User } from '../interfaces';
import { UpdatePasswordDto } from '../users/dto/update-password.dto';

export class UsersDBController {
  users: User[];

  constructor() {
    this.users = [];
  }

  getAll(): User[] {
    return this.users.map((user) => {
      return this.removePasswordField(user);
    });
  }

  getById(id: string): User | undefined {
    const user = this.users.find((user) => user.id === id);
    if (!user) return undefined;
    return this.removePasswordField(user);
  }

  create(user: User): User {
    this.users.push(user);
    return this.getById(user.id);
  }

  changePassword(id: string, updatePasswordDto: UpdatePasswordDto): User {
    const { oldPassword, newPassword } = updatePasswordDto;

    const userIndex = this.users.findIndex((user) => user.id === id);
    const user = this.users[userIndex];

    if (user.password !== oldPassword)
      throw new Error('Old password is incorrect');

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
