import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm'

export class CreateAuctionBidTable1625935377807 implements MigrationInterface {
  public async up (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: 'AuctionBid',
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
          name: 'auctiomItemId',
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

    await queryRunner.createForeignKey('AuctionBid', new TableForeignKey({
      columnNames: ['auctionItemId'],
      referencedColumnNames: ['id'],
      referencedTableName: 'AuctionItems',
      onDelete: 'CASCADE'
    }))

    await queryRunner.createForeignKey('AuctionBid', new TableForeignKey({
      columnNames: ['participantId'],
      referencedColumnNames: ['id'],
      referencedTableName: 'Participants',
      onDelete: 'CASCADE'
    }))
  }

  public async down (queryRunner: QueryRunner): Promise<void> {
    const table: Table = await queryRunner.getTable('AuctionBid')
    const auctionItemFk = table.foreignKeys.find(fk => fk.columnNames.indexOf('auctionItemId') !== -1)
    const participantFk = table.foreignKeys.find(fk => fk.columnNames.indexOf('auctionItemId') !== -1)
    await queryRunner.dropForeignKey('AuctionBid', auctionItemFk)
    await queryRunner.dropForeignKey('AuctionBid', participantFk)
    await queryRunner.dropColumn('AuctionBid', 'auctiomItemId')
    await queryRunner.dropColumn('AuctionBid', 'participantId')
    await queryRunner.dropTable('AuctionBid')
  }
}
