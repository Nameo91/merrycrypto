import { MigrationInterface, QueryRunner } from "typeorm";

export class UsersUsername1669032711247 implements MigrationInterface {
    name = 'UsersUsername1669032711247'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "username" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "username"`);
    }

}
