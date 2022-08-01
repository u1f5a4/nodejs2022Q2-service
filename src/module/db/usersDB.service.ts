import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { UserDto } from '../../endpoints/users/dto/user.dto';
import { UpdatePasswordDto } from '../../endpoints/users/dto/update-password.dto';
import { UserEntity } from '../../endpoints/users/entities/user.entity';

@Injectable()
export class UsersDB {
  constructor(
    @InjectRepository(UserEntity)
    private readonly usersRepository: Repository<UserEntity>,
  ) {}

  async create(user: UserDto) {
    const newUser = this.usersRepository.create(user);
    return (await this.usersRepository.save(newUser)).toResponse();
  }

  async getUserByLogin(login: string) {
    return await this.usersRepository.findOne({ where: { login } });
  }

  async getAll() {
    const users = await this.usersRepository.find();
    return users.map((user) => user.toResponse());
  }

  async getById(userId: string) {
    const user = await this.usersRepository.findOne({ where: { id: userId } });
    if (!user) return undefined;
    return user.toResponse();
  }

  async changePassword(userId: string, updatePasswordDto: UpdatePasswordDto) {
    const { oldPassword, newPassword } = updatePasswordDto;

    const user = await this.usersRepository.findOne({ where: { id: userId } });

    if (user.password !== oldPassword)
      throw new Error('Old password is incorrect');

    user.password = newPassword;

    return (await this.usersRepository.save(user)).toResponse();
  }

  async delete(userId: string) {
    const { affected } = await this.usersRepository.delete({ id: userId });
    return affected === 1;
  }
}
