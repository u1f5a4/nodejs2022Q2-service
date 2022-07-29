import { validate } from 'uuid';
import { Injectable } from '@nestjs/common';

import { UpdatePasswordDto } from './dto/update-password.dto';
import { UserDto } from './dto/create-user.dto';
import { UserDB } from '../db/userDB.service';
import { FavsDB } from '../db/favsDB.service';

@Injectable()
export class UsersService {
  constructor(
    private readonly usersDB: UserDB,
    private readonly favsDB: FavsDB,
  ) {}

  async create(userData: UserDto) {
    const user = await this.usersDB.create(userData);
    await this.favsDB.create('1');
    return user;
  }

  async getAll() {
    return await this.usersDB.getAll();
  }

  async getById(userId: string) {
    return await this.usersDB.getById(userId);
  }

  async changePassword(userId: string, updatePasswordDto: UpdatePasswordDto) {
    return await this.usersDB.changePassword(userId, updatePasswordDto);
  }

  async delete(userId: string) {
    return await this.usersDB.delete(userId);
  }

  validateUUID(userId: string) {
    return validate(userId);
  }
}
