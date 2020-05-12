import {MigrationInterface, QueryRunner} from "typeorm";

export class AddColumnAccountIdToUser1589308425282 implements MigrationInterface {
    name = 'AddColumnAccountIdToUser1589308425282'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "accountId" integer`, undefined);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "UQ_68d3c22dbd95449360fdbf7a3f1" UNIQUE ("accountId")`, undefined);
        await queryRunner.query(`ALTER TABLE "account" ADD "userId" integer`, undefined);
        await queryRunner.query(`ALTER TABLE "account" ADD CONSTRAINT "UQ_60328bf27019ff5498c4b977421" UNIQUE ("userId")`, undefined);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_68d3c22dbd95449360fdbf7a3f1" FOREIGN KEY ("accountId") REFERENCES "account"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "account" ADD CONSTRAINT "FK_60328bf27019ff5498c4b977421" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "account" DROP CONSTRAINT "FK_60328bf27019ff5498c4b977421"`, undefined);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_68d3c22dbd95449360fdbf7a3f1"`, undefined);
        await queryRunner.query(`ALTER TABLE "account" DROP CONSTRAINT "UQ_60328bf27019ff5498c4b977421"`, undefined);
        await queryRunner.query(`ALTER TABLE "account" DROP COLUMN "userId"`, undefined);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "UQ_68d3c22dbd95449360fdbf7a3f1"`, undefined);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "accountId"`, undefined);
    }

}
