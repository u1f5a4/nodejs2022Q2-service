import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('favs')
export class FavsEntity {
  @PrimaryColumn()
  userId: string;

  @Column('simple-array', { nullable: true })
  tracksIds: string[] | null;

  @Column('simple-array', { nullable: true })
  albumsIds: string[] | null;

  @Column('simple-array', { nullable: true })
  artistsIds: string[] | null;
}
