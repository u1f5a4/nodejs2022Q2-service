import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FavsEntity } from '../../endpoints/favs/entities/favs.entity';

@Injectable()
export class FavsDB {
  private favs: any;

  constructor(
    @InjectRepository(FavsEntity)
    private readonly favsRepository: Repository<FavsEntity>,
  ) {
    this.favs = {
      tracksIds: [],
      albumsIds: [],
      artistsIds: [],
    };
  }

  public async create(userId: string) {
    const favs = new FavsEntity();
    favs.userId = userId;

    return await this.favsRepository.save(favs);
  }

  public async getAll(userId: string) {
    const favs = await this.favsRepository.find({ where: { userId } });
    if (favs.length === 0) throw new Error('user not found');

    const entity = favs[0] as FavsEntity;
    entity.tracksIds = entity.tracksIds || [];
    entity.albumsIds = entity.albumsIds || [];
    entity.artistsIds = entity.artistsIds || [];
    return entity;
  }

  public async addTrack(id: string) {
    // !Hardcode .getAll(userId)
    const userId = '1';

    const { tracksIds } = await this.getAll(userId);
    if (tracksIds.includes(id)) return;
    tracksIds.push(id);
    await this.favsRepository.update(userId, { tracksIds });
  }

  public async removeTrack(id: string) {
    // !Hardcode .getAll(userId)
    const userId = '1';

    const { tracksIds } = await this.getAll(userId);
    if (!tracksIds.includes(id)) return;
    tracksIds.splice(tracksIds.indexOf(id), 1);
    await this.favsRepository.update(userId, { tracksIds });
  }

  public async addAlbum(id: string) {
    // !Hardcode .getAll(userId)
    const userId = '1';

    const { albumsIds } = await this.getAll(userId);
    if (albumsIds.includes(id)) return;
    albumsIds.push(id);
    await this.favsRepository.update(userId, { albumsIds });
  }

  public async removeAlbum(id: string) {
    // !Hardcode .getAll(userId)
    const userId = '1';

    const { albumsIds } = await this.getAll(userId);
    if (!albumsIds.includes(id)) return;
    albumsIds.splice(albumsIds.indexOf(id), 1);
    await this.favsRepository.update(userId, { albumsIds });
  }

  public async addArtist(id: string) {
    // !Hardcode .getAll(userId)
    const userId = '1';

    const { artistsIds } = await this.getAll(userId);
    if (artistsIds.includes(id)) return;
    artistsIds.push(id);
    await this.favsRepository.update(userId, { artistsIds });
  }

  public async removeArtist(id: string) {
    // !Hardcode .getAll(userId)
    const userId = '1';

    const { artistsIds } = await this.getAll(userId);
    if (!artistsIds.includes(id)) return;
    artistsIds.splice(artistsIds.indexOf(id), 1);
    await this.favsRepository.update(userId, { artistsIds });
  }
}
