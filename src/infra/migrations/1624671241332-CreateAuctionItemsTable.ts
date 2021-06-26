import { MigrationInterface, QueryRunner, Table, TableColumn, TableForeignKey } from 'typeorm'

export class CreateAuctionItemsTable1624671241332 implements MigrationInterface {
  public async up (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: 'auction_items',
      columns: [
        {
          name: 'id',
          type: 'varchar',
          isPrimary: true
        },
        {
          name: 'title',
          type: 'varchar',
          length: '32',
          isNullable: false,
          isUnique: false
        },
        {
          name: 'description',
          type: 'varchar',
          length: '128',
          isNullable: false,
          isUnique: false
        },
        {
          name: 'minimumValue',
          type: 'decimal',
          isNullable: false,
          isUnique: false
        },
        {
          name: 'imagePath',
          type: 'varchar',
          length: '255',
          isNullable: false,
          isUnique: false
        },
        {
          name: 'finishedOff',
          type: 'smallint',
          isNullable: false,
          isUnique: false,
          default: 0
        }
      ]
    }
    ))

    await queryRunner.addColumn('auction_items', new TableColumn({
      name: 'auction_id',
      type: 'varchar'
    }))

    await queryRunner.createForeignKey('auction_items', new TableForeignKey({
      columnNames: ['auction_id'],
      referencedColumnNames: ['id'],
      referencedTableName: 'auctions',
      onDelete: 'CASCADE'
    }))
  }

  public async down (queryRunner: QueryRunner): Promise<void> {
    const auctionsTable = await queryRunner.getTable('auctions')
    const auctionsForeignKey = auctionsTable.foreignKeys.find(fk => fk.columnNames.indexOf('auction_id') !== -1)
    await queryRunner.dropForeignKey('auction_items', auctionsForeignKey)
    await queryRunner.dropColumn('auction_items', 'auction_id')
  }
}
