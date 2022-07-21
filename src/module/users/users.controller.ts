import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { UsersService } from './users.service';

@Controller('user')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  getAll() {
    return this.usersService.getAll();
  }

  @Get('/:userId')
  async getById(@Param('userId') userId: string) {
    this.validateUUID(userId);
    await this.checkUserExists(userId);

    return this.usersService.getById(userId);
  }

  @Put('/:userId')
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  async update(
    @Param('userId') userId: string,
    @Body() updatePasswordDto: UpdatePasswordDto,
  ) {
    this.validateUUID(userId);
    await this.checkUserExists(userId);

    try {
      return await this.usersService.changePassword(userId, updatePasswordDto);
    } catch (e) {
      if (e.message === 'Old password is incorrect')
        throw new HttpException({}, HttpStatus.FORBIDDEN);
    }
  }

  @Delete('/:userId')
  @HttpCode(204)
  async delete(@Param('userId') userId: string) {
    this.validateUUID(userId);
    await this.checkUserExists(userId);

    this.usersService.delete(userId);
  }

  private validateUUID(userId: string) {
    const isUUID = this.usersService.validateUUID(userId);
    if (!isUUID)
      throw new HttpException('Invalid UUID', HttpStatus.BAD_REQUEST);
  }

  private async checkUserExists(userId: string) {
    const user = await this.usersService.getById(userId);
    if (!user) throw new HttpException('User not exists', HttpStatus.NOT_FOUND);
  }
}
