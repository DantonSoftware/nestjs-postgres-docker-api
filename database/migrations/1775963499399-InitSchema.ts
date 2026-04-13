import { MigrationInterface, QueryRunner } from "typeorm";

export class InitSchema1775963499399 implements MigrationInterface {
    name = 'InitSchema1775963499399'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "password" character varying(255)`);

        await queryRunner.query(`
        UPDATE "users"
        SET "password" = '$2b$10$wH7m6R2Q4sYqJm4q7QmZ2u9N1QzX6hQd6s8eQn1D7nGmV8pQbP2bG'
        WHERE "password" IS NULL
        `);

        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "password" SET NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "password"`);
    }

}
