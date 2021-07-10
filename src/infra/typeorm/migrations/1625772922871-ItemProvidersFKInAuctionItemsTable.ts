import { MigrationInterface, QueryRunner, Table, TableColumn, TableForeignKey } from 'typeorm'

export class ItemProvidersFKInAuctionItemsTable1625772922871 implements MigrationInterface {
  public async up (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn('AuctionItems', new TableColumn(
      {
        name: 'itemProviderId',
        type: 'varchar'
      }
    ))

    await queryRunner.createForeignKey('AuctionItems', new TableForeignKey({
      columnNames: ['itemProviderId'],
      referencedColumnNames: ['id'],
      referencedTableName: 'ItemProviders',
      onDelete: 'CASCADE'
    }))
  }

  public async down (queryRunner: QueryRunner): Promise<void> {
    const table: Table = await queryRunner.getTable('AuctionItems')
    const itemProviderFk = table.foreignKeys.find(fk => fk.columnNames.indexOf('itemProviderId') !== -1)
    await queryRunner.dropForeignKey('AuctionItems', itemProviderFk)
    await queryRunner.dropColumn('AuctionItems', 'itemProviderId')
  }
}
