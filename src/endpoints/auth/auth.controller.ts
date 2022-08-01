import {
  Body,
  Controller,
  HttpCode,
  HttpException,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UserDto } from '../users/dto/create-user.dto';

import { AuthService } from './auth.service';

@Controller('')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  async signup(@Body() userDto: UserDto) {
    return await this.authService.signup(userDto);
  }

  @Post('login')
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  @HttpCode(200)
  async login(@Body() userDto: UserDto) {
    try {
      return await this.authService.login(userDto);
    } catch (error) {
      const { message } = error;

      if (message === 'no login or password')
        throw new HttpException('no login or password', 400);
    }
  }

  @Post('refresh')
  @HttpCode(200)
  async refresh(@Body('refreshToken') refreshToken: string) {
    return await this.authService.refresh(refreshToken);
  }
}
