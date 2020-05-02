import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateAccountTable1588436495661 implements MigrationInterface {
  name = "CreateAccountTable1588436495661";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "account" ("id" SERIAL NOT NULL, "balance" double precision NOT NULL, CONSTRAINT "PK_54115ee388cdb6d86bb4bf5b2ea" PRIMARY KEY ("id"))`,
      undefined
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "account"`, undefined);
  }
}
