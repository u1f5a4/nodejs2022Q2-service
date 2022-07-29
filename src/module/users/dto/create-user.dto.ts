import { IsNotEmpty, IsString } from 'class-validator';

interface IUserDto {
  login: string;
  password: string;
}

export class UserDto implements IUserDto {
  @IsNotEmpty()
  @IsString()
  login: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}
