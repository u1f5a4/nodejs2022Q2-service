import { v4 as uuid, validate } from 'uuid';
import { Injectable } from '@nestjs/common';

import { UpdatePasswordDto } from './dto/update-password.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersDB } from '../db/usersDB.service';

@Injectable()
export class UsersService {
  constructor(private readonly usersDB: UsersDB) {}

  create(userData: CreateUserDto) {
    return this.usersDB.create(userData);
  }

  getAll() {
    return this.usersDB.getAll();
  }

  getById(userId: string) {
    return this.usersDB.getById(userId);
  }

  changePassword(userId: string, updatePasswordDto: UpdatePasswordDto) {
    return this.usersDB.changePassword(userId, updatePasswordDto);
  }

  delete(userId: string) {
    return this.usersDB.delete(userId);
  }

  validateUUID(userId: string) {
    return validate(userId);
  }
}
