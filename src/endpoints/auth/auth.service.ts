import { JwtService } from '@nestjs/jwt';
import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

import { UsersDB } from 'src/module/db/usersDB.service';
import { UserDto } from '../users/dto/user.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersDB: UsersDB,
    private readonly jwtService: JwtService,
  ) {}

  async signup(userDto: UserDto) {
    const { login, password } = userDto;
    const hash = await this.generateHash(password);

    const newUser = { login, password: hash };
    await this.usersDB.create(newUser);
  }

  async login(userDto: UserDto) {
    const { login, password } = userDto;

    const user = await this.usersDB.getUserByLogin(login);
    if (!user) throw new Error('no login or password');

    const isValid = await this.compareHash(password, user.password);
    if (!isValid) throw new Error('no login or password');

    const token = await this.generateJWT(user.id, login);
    return { token };
  }

  async refresh(refreshToken: string) {
    throw new Error('not implemented');
    return refreshToken;
  }

  private async generateHash(password: string) {
    const salt = Number(process.env.CRYPT_SALT);
    return await bcrypt.hash(password, salt);
  }

  private async compareHash(password: string, hash: string) {
    return await bcrypt.compare(password, hash);
  }

  private async generateJWT(userId: string, login: string) {
    return this.jwtService.signAsync({ userId, login });
  }
}
