import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UsePipes,
  ValidationPipe,
  HttpCode,
  HttpException,
  HttpStatus,
  Put,
} from '@nestjs/common';

import { ArtistsService } from './artists.service';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';

@Controller('artist')
export class ArtistsController {
  constructor(private readonly artistsService: ArtistsService) {}

  @Post()
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  create(@Body() createArtistDto: CreateArtistDto) {
    return this.artistsService.create(createArtistDto);
  }

  @Get()
  getAll() {
    return this.artistsService.getAll();
  }

  @Get(':id')
  getById(@Param('id') id: string) {
    this.validateUUID(id);
    this.exists(id);

    return this.artistsService.getById(id);
  }

  @Put(':id')
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  update(@Param('id') id: string, @Body() updateArtistDto: UpdateArtistDto) {
    this.validateUUID(id);
    this.exists(id);

    return this.artistsService.update(id, updateArtistDto);
  }

  @Delete(':id')
  @HttpCode(204)
  delete(@Param('id') id: string) {
    this.validateUUID(id);
    this.exists(id);

    this.artistsService.delete(id);
  }

  private exists(id: string) {
    const artist = this.artistsService.getById(id);
    if (!artist) {
      throw new HttpException('Artist not found', HttpStatus.NOT_FOUND);
    }
  }

  private validateUUID(id: string) {
    const isUUID = this.artistsService.validateUUID(id);
    if (!isUUID) {
      throw new HttpException('Invalid UUID', HttpStatus.BAD_REQUEST);
    }
  }
}
