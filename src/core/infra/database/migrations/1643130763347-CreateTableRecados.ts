import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateTableRecados1643130763347 implements MigrationInterface {
    name = 'CreateTableRecados1643130763347'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "recados" ("uid" uuid NOT NULL DEFAULT uuid_generate_v4(), "descricao" character varying NOT NULL, "detalhamento" character varying, "created_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_4c05a5828e0b6fee40a7e78e6e8" PRIMARY KEY ("uid"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "recados"`);
    }

}
