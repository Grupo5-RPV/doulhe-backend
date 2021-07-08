import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm'

export class CreateAuctionItemsTable1625003987014 implements MigrationInterface {
  public async up (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: 'AuctionItems',
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
          name: 'minimumBid',
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
        },
        {
          name: 'auctionId',
          type: 'varchar'
        },
        {
          name: 'categoryId',
          type: 'varchar'
        },
        {
          name: 'itemProviderId',
          type: 'varchar'
        }
      ]
    }
    ))

    await queryRunner.createForeignKey('AuctionItems', new TableForeignKey({
      columnNames: ['auctionId'],
      referencedColumnNames: ['id'],
      referencedTableName: 'Auctions',
      onDelete: 'CASCADE'
    }))

    await queryRunner.createForeignKey('AuctionItems', new TableForeignKey({
      columnNames: ['categoryId'],
      referencedColumnNames: ['id'],
      referencedTableName: 'Categories',
      onDelete: 'CASCADE'
    }))

    await queryRunner.createForeignKey('AuctionItems', new TableForeignKey({
      columnNames: ['itemProviderId'],
      referencedColumnNames: ['id'],
      referencedTableName: 'ItemProviders',
      onDelete: 'CASCADE'
    }))
  }

  public async down (queryRunner: QueryRunner): Promise<void> {
    const table: Table = await queryRunner.getTable('AuctionItems')
    const auctionFk = table.foreignKeys.find(fk => fk.columnNames.indexOf('auctionId') !== -1)
    const categoryFk = table.foreignKeys.find(fk => fk.columnNames.indexOf('categoryId') !== -1)
    const itemProviderFk = table.foreignKeys.find(fk => fk.columnNames.indexOf('itemProviderId') !== -1)
    await queryRunner.dropForeignKey('AuctionItems', auctionFk)
    await queryRunner.dropForeignKey('AuctionItems', categoryFk)
    await queryRunner.dropForeignKey('AuctionItems', itemProviderFk)
    await queryRunner.dropColumn('AuctionItems', 'auctionId')
    await queryRunner.dropColumn('AuctionItems', 'categoryId')
    await queryRunner.dropColumn('AuctionItems', 'itemProviderId')
    await queryRunner.dropTable('AuctionItems')
  }
}
