import {MigrationInterface, QueryRunner} from "typeorm";

export class TestsMigration1644792495533 implements MigrationInterface {
    name = 'TestsMigration1644792495533'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "recados" ("uid" varchar PRIMARY KEY NOT NULL, "descricao" varchar NOT NULL, "detalhamento" varchar, "created_at" datetime NOT NULL DEFAULT (datetime('now')))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "recados"`);
    }

}
