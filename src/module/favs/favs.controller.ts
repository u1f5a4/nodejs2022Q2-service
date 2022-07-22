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
  async findAll() {
    return await this.favsService.getAll();
  }

  @Post('/track/:id')
  async addTrack(@Param('id') id: string) {
    await this.validate('Track', id);
    this.favsService.addTrack(id);
  }

  @Delete('/track/:id')
  @HttpCode(204)
  async removeTrack(@Param('id') id: string) {
    await this.validate('Track', id);
    this.favsService.removeTrack(id);
  }

  @Post('/album/:id')
  async addAlbum(@Param('id') id: string) {
    await this.validate('Album', id);
    this.favsService.addAlbum(id);
  }

  @Delete('/album/:id')
  @HttpCode(204)
  async removeAlbum(@Param('id') id: string) {
    await this.validate('Album', id);
    this.favsService.removeAlbum(id);
  }

  @Post('/artist/:id')
  async addArtist(@Param('id') id: string) {
    await this.validate('Artist', id);
    this.favsService.addArtist(id);
  }

  @Delete('/artist/:id')
  @HttpCode(204)
  async removeArtist(@Param('id') id: string) {
    await this.validate('Artist', id);
    this.favsService.removeArtist(id);
  }

  private async validate(type: string, id: string) {
    let service: TracksService | AlbumsService | ArtistsService;
    if (type === 'Track') service = this.tracksService;
    if (type === 'Album') service = this.albumsService;
    if (type === 'Artist') service = this.artistsService;

    if (!service.validateUUID(id))
      throw new HttpException('Invalid UUID', HttpStatus.BAD_REQUEST);

    if (!(await service.getById(id)))
      throw new HttpException(
        `${type} not found`,
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
  }
}
