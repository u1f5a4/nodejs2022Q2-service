import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { UsersEntity } from '../../endpoints/auth/entities/users.entity';
import { UserAuthDto } from '../../endpoints/auth/dto/user-auth.dto';

@Injectable()
export class UsersDB {
  constructor(
    @InjectRepository(UsersEntity)
    private readonly usersRepository: Repository<UsersEntity>,
  ) {}

  async create(user: UserAuthDto) {
    const newUser = this.usersRepository.create(user);
    return (await this.usersRepository.save(newUser)).toResponse();
  }

  async getUserByLogin(login: string) {
    return await this.usersRepository.findOne({ where: { login } });
  }
}
