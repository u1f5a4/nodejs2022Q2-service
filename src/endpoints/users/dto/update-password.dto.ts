import { IsNotEmpty, IsString } from 'class-validator';

interface IUpdatePasswordDto {
  oldPassword: string; // previous password
  newPassword: string; // new password
}

export class UpdatePasswordDto implements IUpdatePasswordDto {
  @IsNotEmpty()
  @IsString()
  oldPassword: string;

  @IsNotEmpty()
  @IsString()
  newPassword: string;
}
