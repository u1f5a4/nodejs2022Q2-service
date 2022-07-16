import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateAlbumDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsNumber()
  year: number;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  artistId: string | null;
}
