import {
  Controller,
  Get,
  Post,
  Param,
  Delete,
  HttpStatus,
  HttpException,
  HttpCode,
} from '@nestjs/common';

import { AlbumsService } from '../albums/albums.service';
import { ArtistsService } from '../artists/artists.service';
import { TracksService } from '../tracks/tracks.service';
import { FavsService } from './favs.service';

@Controller('favs')
export class FavsController {
  constructor(
    private readonly favsService: FavsService,
    private readonly tracksService: TracksService,
    private readonly albumsService: AlbumsService,
    private readonly artistsService: ArtistsService,
  ) {}

  @Get()
  findAll() {
    return this.favsService.getAll();
  }

  @Post('/track/:id')
  addTrack(@Param('id') id: string) {
    this.validate('Track', id);
    this.favsService.addTrack(id);
  }

  @Delete('/track/:id')
  @HttpCode(204)
  removeTrack(@Param('id') id: string) {
    this.validate('Track', id);
    this.favsService.removeTrack(id);
  }

  @Post('/album/:id')
  addAlbum(@Param('id') id: string) {
    this.validate('Album', id);
    this.favsService.addAlbum(id);
  }

  @Delete('/album/:id')
  @HttpCode(204)
  removeAlbum(@Param('id') id: string) {
    this.validate('Album', id);
    this.favsService.removeAlbum(id);
  }

  @Post('/artist/:id')
  addArtist(@Param('id') id: string) {
    this.validate('Artist', id);
    this.favsService.addArtist(id);
  }

  @Delete('/artist/:id')
  @HttpCode(204)
  removeArtist(@Param('id') id: string) {
    this.validate('Artist', id);
    this.favsService.removeArtist(id);
  }

  private validate(type: string, id: string) {
    let service: TracksService | AlbumsService | ArtistsService;
    if (type === 'Track') service = this.tracksService;
    if (type === 'Album') service = this.albumsService;
    if (type === 'Artist') service = this.artistsService;

    if (!service.validateUUID(id))
      throw new HttpException('Invalid UUID', HttpStatus.BAD_REQUEST);

    if (!service.getById(id))
      throw new HttpException(
        `${type} not found`,
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
  }
}
