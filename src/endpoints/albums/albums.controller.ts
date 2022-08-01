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
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '../auth/auth.guard';

import { AlbumsService } from './albums.service';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';

@UseGuards(AuthGuard)
@Controller('album')
export class AlbumsController {
  constructor(private readonly albumsService: AlbumsService) {}

  @Post()
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  async create(@Body() createAlbumDto: CreateAlbumDto) {
    return await this.albumsService.create(createAlbumDto);
  }

  @Get()
  async findAll() {
    return await this.albumsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    this.isUUID(id);
    await this.exists(id);

    return await this.albumsService.getById(id);
  }

  @Put(':id')
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  async update(
    @Param('id') id: string,
    @Body() updateAlbumDto: UpdateAlbumDto,
  ) {
    this.isUUID(id);
    await this.exists(id);

    return await this.albumsService.update(id, updateAlbumDto);
  }

  @Delete(':id')
  @HttpCode(204)
  async remove(@Param('id') id: string) {
    this.isUUID(id);
    await this.exists(id);

    return await this.albumsService.remove(id);
  }

  private isUUID(id: string) {
    const isUUID = this.albumsService.validateUUID(id);
    if (!isUUID) {
      throw new HttpException('Invalid UUID', HttpStatus.BAD_REQUEST);
    }
  }

  private async exists(id: string) {
    const exists = await this.albumsService.getById(id);
    if (!exists) {
      throw new HttpException('Album not found', HttpStatus.NOT_FOUND);
    }
  }
}
