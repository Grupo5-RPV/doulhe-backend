import { MigrationInterface, QueryRunner } from 'typeorm'

export class FixNullableDbFields1626180800131 implements MigrationInterface {
  public async up (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE public."AuctionItems" ALTER COLUMN "finishedOff" DROP NOT NULL;')
    await queryRunner.query('ALTER TABLE public."AuctionItems" ALTER COLUMN "auctionId" DROP NOT NULL;')
    await queryRunner.query('ALTER TABLE public."Auctioneers" ALTER COLUMN "token" DROP NOT NULL;')
    await queryRunner.query('ALTER TABLE public."Participants" ALTER COLUMN "token" DROP NOT NULL;')
  }

  public async down (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE public."AuctionItems" ALTER COLUMN "auctionId" SET NOT NULL;')
    await queryRunner.query('ALTER TABLE public."AuctionItems" ALTER COLUMN "auctionId" SET NOT NULL;')
    await queryRunner.query('ALTER TABLE public."Auctioneers" ALTER COLUMN "token" SET NOT NULL;')
    await queryRunner.query('ALTER TABLE public."Participants" ALTER COLUMN "token" SET NOT NULL;')
  }
}
