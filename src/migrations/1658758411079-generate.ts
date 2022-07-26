import { MigrationInterface, QueryRunner } from 'typeorm';

export class generate1658758411079 implements MigrationInterface {
  name = 'generate1658758411079';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "album" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "year" integer NOT NULL, "artistId" character varying, CONSTRAINT "PK_58e0b4b8a31bb897e6959fe3206" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "artist" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "grammy" boolean NOT NULL, CONSTRAINT "PK_55b76e71568b5db4d01d3e394ed" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "favs" ("userId" character varying NOT NULL, "tracksIds" text, "albumsIds" text, "artistsIds" text, CONSTRAINT "PK_740118ee0ee7aa734767a985763" PRIMARY KEY ("userId"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "track" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "artistId" character varying, "albumId" character varying, "duration" integer NOT NULL, CONSTRAINT "PK_0631b9bcf521f8fab3a15f2c37e" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE IF NOT EXISTS public."user"
      (
          id uuid NOT NULL DEFAULT uuid_generate_v4(),
          login character varying COLLATE pg_catalog."default" NOT NULL,
          password character varying COLLATE pg_catalog."default" NOT NULL,
          version integer NOT NULL,
          "createdAt" timestamp without time zone NOT NULL DEFAULT now(),
          "updatedAt" timestamp without time zone NOT NULL DEFAULT now(),
          CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY (id)
      )`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "track"`);
    await queryRunner.query(`DROP TABLE "favs"`);
    await queryRunner.query(`DROP TABLE "artist"`);
    await queryRunner.query(`DROP TABLE "album"`);
    await queryRunner.query(`DROP TABLE "user"`);
  }
}
