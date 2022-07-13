import { v4 as uuid, validate } from 'uuid';
import { Injectable } from '@nestjs/common';
import { dbController, IDBController } from '../db/db';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  usersDBController: IDBController['usersController'];

  constructor() {
    this.usersDBController = dbController.usersController;
  }

  getAll() {
    return this.usersDBController.getAll();
  }

  getById(userId: string) {
    return this.usersDBController.getById(userId);
  }

  create(userData: CreateUserDto) {
    const newUser = {
      ...userData,
      id: uuid(),
      version: 0,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
    return this.usersDBController.create(newUser);
  }

  update(userId: string, updatePasswordDto: UpdatePasswordDto) {
    return this.usersDBController.changePassword(userId, updatePasswordDto);
  }

  delete(userId: string) {
    return this.usersDBController.delete(userId);
  }

  validateUUID(userId: string) {
    return validate(userId);
  }
}
