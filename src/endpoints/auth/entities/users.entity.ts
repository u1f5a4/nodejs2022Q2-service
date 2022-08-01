import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  VersionColumn,
} from 'typeorm';

@Entity('users')
export class UsersEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  login: string;

  @Column()
  password: string;

  @VersionColumn()
  version: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  toResponse() {
    const { id, login, password, version, createdAt, updatedAt } = this;
    const convertToTimeStamp = (date: Date) => date.getTime();

    return {
      id,
      login,
      password,
      version,
      createdAt: convertToTimeStamp(createdAt),
      updatedAt: convertToTimeStamp(updatedAt),
    };
  }
}
