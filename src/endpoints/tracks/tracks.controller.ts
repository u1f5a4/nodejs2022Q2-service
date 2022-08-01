import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  HttpException,
  HttpStatus,
  HttpCode,
  UsePipes,
  ValidationPipe,
  UseGuards,
} from '@nestjs/common';

import { TracksService } from './tracks.service';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { AuthGuard } from '../auth/auth.guard';

@UseGuards(AuthGuard)
@Controller('track')
export class TracksController {
  constructor(private readonly tracksService: TracksService) {}

  @Post()
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  async create(@Body() createTrackDto: CreateTrackDto) {
    return await this.tracksService.create(createTrackDto);
  }

  @Get()
  async getAll() {
    return await this.tracksService.getAll();
  }

  @Get(':id')
  async getById(@Param('id') id: string) {
    this.validateUUID(id);
    await this.checkTrackExists(id);

    return await this.tracksService.getById(id);
  }

  @Put(':id')
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  async update(
    @Param('id') id: string,
    @Body() updateTrackDto: UpdateTrackDto,
  ) {
    this.validateUUID(id);
    await this.checkTrackExists(id);

    return await this.tracksService.update(id, updateTrackDto);
  }

  @Delete(':id')
  @HttpCode(204)
  async delete(@Param('id') id: string) {
    this.validateUUID(id);
    await this.checkTrackExists(id);

    await this.tracksService.delete(id);
  }

  private validateUUID(id: string) {
    const isUUID = this.tracksService.validateUUID(id);
    if (!isUUID)
      throw new HttpException('Invalid UUID', HttpStatus.BAD_REQUEST);
  }

  private async checkTrackExists(id: string) {
    const track = await this.tracksService.getById(id);
    if (!track)
      throw new HttpException('User does not exist', HttpStatus.NOT_FOUND);
  }
}
