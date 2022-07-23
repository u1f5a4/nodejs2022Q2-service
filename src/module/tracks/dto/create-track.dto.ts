import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

export class CreateTrackDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsOptional()
  @IsNotEmpty()
  @IsUUID(4)
  artistId: string | null;

  @IsOptional()
  @IsNotEmpty()
  @IsUUID(4)
  albumId: string | null;

  @IsNotEmpty()
  @IsNumber()
  duration: number;
}
