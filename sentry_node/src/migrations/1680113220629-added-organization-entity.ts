import { MigrationInterface, QueryRunner } from "typeorm"

export class addedOrganizationEntity1680113220629 implements MigrationInterface {
    name = 'addedOrganizationEntity1680113220629'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "organization" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying NOT NULL, "admin_user_id" uuid, FOREIGN KEY ("admin_user_id") REFERENCES users("id"))`);
        await queryRunner.query(`CREATE INDEX "org_index" ON "organization" ("name") `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "public"."org_index"`);
        await queryRunner.query(`DROP TABLE "organization"`);
    }

}
