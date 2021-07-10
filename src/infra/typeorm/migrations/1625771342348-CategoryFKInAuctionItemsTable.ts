import { MigrationInterface, QueryRunner, Table, TableColumn, TableForeignKey } from 'typeorm'

export class CategoryFKInAuctionItemsTable1625771342348 implements MigrationInterface {
  public async up (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn('AuctionItems', new TableColumn(
      {
        name: 'categoryId',
        type: 'varchar'
      }
    ))

    await queryRunner.createForeignKey('AuctionItems', new TableForeignKey({
      columnNames: ['categoryId'],
      referencedColumnNames: ['id'],
      referencedTableName: 'Categories',
      onDelete: 'CASCADE'
    }))
  }

  public async down (queryRunner: QueryRunner): Promise<void> {
    const table: Table = await queryRunner.getTable('AuctionItems')
    const categoryFk = table.foreignKeys.find(fk => fk.columnNames.indexOf('categoryId') !== -1)
    await queryRunner.dropForeignKey('AuctionItems', categoryFk)
    await queryRunner.dropColumn('AuctionItems', 'categoryId')
  }
}
