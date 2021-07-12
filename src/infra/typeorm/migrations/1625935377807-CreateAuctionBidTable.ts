import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm'

export class CreateAuctionBidTable1625935377807 implements MigrationInterface {
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
          name: 'timestamp',
          type: 'timestamp',
          isNullable: false
        },
        {
          name: 'value',
          type: 'decimal',
          isNullable: false
        },
        {
          name: 'auctionItemId',
          type: 'varchar',
          isNullable: false
        },
        {
          name: 'participantId',
          type: 'varchar',
          isNullable: false
        }
      ]
    }
    ))

    await queryRunner.createForeignKey('AuctionBids', new TableForeignKey({
      columnNames: ['auctionItemId'],
      referencedColumnNames: ['id'],
      referencedTableName: 'AuctionItems',
      onDelete: 'CASCADE'
    }))

    await queryRunner.createForeignKey('AuctionBids', new TableForeignKey({
      columnNames: ['participantId'],
      referencedColumnNames: ['id'],
      referencedTableName: 'Participants',
      onDelete: 'CASCADE'
    }))
  }

  public async down (queryRunner: QueryRunner): Promise<void> {
    const table: Table = await queryRunner.getTable('AuctionBids')
    const auctionItemFk = table.foreignKeys.find(fk => fk.columnNames.indexOf('auctionItemId') !== -1)
    const participantFk = table.foreignKeys.find(fk => fk.columnNames.indexOf('auctionItemId') !== -1)
    await queryRunner.dropForeignKey('AuctionBids', auctionItemFk)
    await queryRunner.dropForeignKey('AuctionBids', participantFk)
    await queryRunner.dropColumn('AuctionBids', 'auctiomItemId')
    await queryRunner.dropColumn('AuctionBids', 'participantId')
    await queryRunner.dropTable('AuctionBids')
  }
}
