import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateAuctionBidTable1625553196713 implements MigrationInterface {

    public async up (queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
          name: 'AuctionBids',
          columns: [
            {
              name: 'id',
              type: 'varchar',
              isPrimary: true
            },
            {
              name: 'value',
              type: 'decimal',
              isNullable: false,
              isUnique: false
            },
            {
              name: 'hourBid',
              type: 'time',
              isNullable: false,
              isUnique: false
            }
          ]
        }))
      }
    
      public async down (queryRunner: QueryRunner): Promise<void> {
        queryRunner.dropTable('AuctionBids')
      }
}
