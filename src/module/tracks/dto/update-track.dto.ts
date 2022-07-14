import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty, IsString, IsNumber, IsUUID } from 'class-validator';
import { CreateTrackDto } from './create-track.dto';

export class UpdateTrackDto extends PartialType(CreateTrackDto) {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsUUID(4)
  artistId: string | null;

  @IsNotEmpty()
  @IsUUID(4)
  albumId: string | null;

  @IsNotEmpty()
  @IsNumber()
  duration: number;
}
