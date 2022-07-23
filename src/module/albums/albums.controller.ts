import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  HttpCode,
  HttpException,
  UsePipes,
  ValidationPipe,
  HttpStatus,
} from '@nestjs/common';

import { AlbumsService } from './albums.service';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';

@Controller('album')
export class AlbumsController {
  constructor(private readonly albumsService: AlbumsService) {}

  @Post()
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  create(@Body() createAlbumDto: CreateAlbumDto) {
    return this.albumsService.create(createAlbumDto);
  }

  @Get()
  findAll() {
    return this.albumsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    this.isUUID(id);
    this.exists(id);

    return this.albumsService.getById(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateAlbumDto: UpdateAlbumDto) {
    this.isUUID(id);
    this.exists(id);

    return this.albumsService.update(id, updateAlbumDto);
  }

  @Delete(':id')
  @HttpCode(204)
  remove(@Param('id') id: string) {
    this.isUUID(id);
    this.exists(id);

    return this.albumsService.remove(id);
  }

  private isUUID(id: string) {
    const isUUID = this.albumsService.validateUUID(id);
    if (!isUUID) {
      throw new HttpException('Invalid UUID', HttpStatus.BAD_REQUEST);
    }
  }

  private exists(id: string) {
    const exists = this.albumsService.getById(id);
    if (!exists) {
      throw new HttpException('Album not found', HttpStatus.NOT_FOUND);
    }
  }
}
