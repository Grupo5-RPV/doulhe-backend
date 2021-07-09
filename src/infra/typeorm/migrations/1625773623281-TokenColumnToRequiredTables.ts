import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm'

export class TokenColumnToRequiredTables1625768064200 implements MigrationInterface {
  public async up (queryRunner: QueryRunner): Promise<void> {
    queryRunner.addColumn('Auctioneers', new TableColumn({
      name: 'token',
      type: 'varchar',
      isNullable: true
    }))
  }

  public async down (queryRunner: QueryRunner): Promise<void> {
    queryRunner.dropColumn('Auctioneers', 'token')
  }
}
