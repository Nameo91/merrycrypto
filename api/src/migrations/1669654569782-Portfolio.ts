import { MigrationInterface, QueryRunner } from "typeorm";

export class Portfolio1669654569782 implements MigrationInterface {
    name = 'Portfolio1669654569782'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "users" ("id" SERIAL NOT NULL, "email" character varying NOT NULL, "username" character varying NOT NULL, "password" character varying NOT NULL, "starredCoins" text array NOT NULL DEFAULT '{}', "portfolio" jsonb NOT NULL DEFAULT '[]', CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "users"`);
    }

}
