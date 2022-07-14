import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateTrackDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  artistId: string | null;

  @IsNotEmpty()
  albumId: string | null;

  @IsNotEmpty()
  @IsNumber()
  duration: number;
}
