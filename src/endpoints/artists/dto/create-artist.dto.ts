import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';
import { Artist } from 'src/module/interfaces';

export class CreateArtistDto implements Partial<Artist> {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsBoolean()
  grammy: boolean;
}
