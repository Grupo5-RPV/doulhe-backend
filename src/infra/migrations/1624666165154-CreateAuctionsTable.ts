import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class CreateAuctionsTable1624666165154 implements MigrationInterface {
  public async up (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: 'auctions',
      columns: [
        {
          name: 'id',
          type: 'varchar',
          isPrimary: true
        },
        {
          name: 'start',
          type: 'timestamp',
          isNullable: false,
          isUnique: false
        },
        {
          name: 'end',
          type: 'timestamp',
          isNullable: false,
          isUnique: false
        },
        {
          name: 'closed',
          type: 'smallint',
          isNullable: false,
          default: 0
        }
      ]
    }))
  }

  public async down (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('auctions')
  }
}
