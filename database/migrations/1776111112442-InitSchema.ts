import { MigrationInterface, QueryRunner } from "typeorm";

export class InitSchema1776111112442 implements MigrationInterface {
    name = 'InitSchema1776111112442'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "posts" ADD "deletedAt" TIMESTAMP`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "posts" DROP COLUMN "deletedAt"`);
    }

}
