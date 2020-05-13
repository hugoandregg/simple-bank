import {MigrationInterface, QueryRunner} from "typeorm";

export class removeAccountFromUser1589403013748 implements MigrationInterface {
    name = 'removeAccountFromUser1589403013748'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_68d3c22dbd95449360fdbf7a3f1"`, undefined);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "UQ_68d3c22dbd95449360fdbf7a3f1"`, undefined);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "accountId"`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "accountId" integer`, undefined);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "UQ_68d3c22dbd95449360fdbf7a3f1" UNIQUE ("accountId")`, undefined);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_68d3c22dbd95449360fdbf7a3f1" FOREIGN KEY ("accountId") REFERENCES "account"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
    }

}
