import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from '../interfaces';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { UpdatePasswordDto } from '../users/dto/update-password.dto';
import { UserEntity } from '../users/entities/user.entity';

@Injectable()
export class UsersDB {
  private users: User[];

  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {
    this.users = [];
  }

  async create(user: CreateUserDto) {
    const newUser = this.userRepository.create(user);
    return (await this.userRepository.save(newUser)).toResponse();
  }

  async getAll() {
    const users = await this.userRepository.find();
    return users.map((user) => user.toResponse());
  }

  async getById(userId: string) {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) return undefined;
    return user.toResponse();
  }

  async changePassword(userId: string, updatePasswordDto: UpdatePasswordDto) {
    const { oldPassword, newPassword } = updatePasswordDto;

    const user = await this.userRepository.findOne({ where: { id: userId } });

    if (user.password !== oldPassword)
      throw new Error('Old password is incorrect');

    user.password = newPassword;

    return (await this.userRepository.save(user)).toResponse();
  }

  async delete(userId: string) {
    const { affected } = await this.userRepository.delete({ id: userId });
    return affected === 1;
  }
}
