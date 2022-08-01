import 'dotenv/config';
import * as bcrypt from 'bcrypt';
import * as jsonwebtoken from 'jsonwebtoken';
import { Injectable } from '@nestjs/common';

import { UserAuthDto } from './dto/user-auth.dto';
import { UsersDB } from '../../module/db/usersDB.service';

@Injectable()
export class AuthService {
  constructor(private readonly usersDB: UsersDB) {}

  async signup(userDto: UserAuthDto) {
    const { login, password } = userDto;
    const hash = await this.generateHash(password);

    const newUser = { login, password: hash };
    await this.usersDB.create(newUser);
  }

  async login(userDto: UserAuthDto) {
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
    const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;
    const TOKEN_EXPIRE_TIME = process.env.TOKEN_EXPIRE_TIME;

    return jsonwebtoken.sign({ userId, login }, JWT_SECRET_KEY, {
      expiresIn: TOKEN_EXPIRE_TIME,
    });
  }
}
