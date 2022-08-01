import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { UserDto } from '../../endpoints/users/dto/create-user.dto';
import { UpdatePasswordDto } from '../../endpoints/users/dto/update-password.dto';
import { UserEntity } from '../../endpoints/users/entities/user.entity';

@Injectable()
export class UserDB {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async create(user: UserDto) {
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
