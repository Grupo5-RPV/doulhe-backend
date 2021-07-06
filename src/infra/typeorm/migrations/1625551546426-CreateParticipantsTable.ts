import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateParticipantsTable1625551546426 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'Participants',
            columns: [
                {
                    name: 'id',
                    type: 'varchar',
                    isPrimary: true
                },
                {
                    name: 'name',
                    type: 'varchar',
                    isNullable: false,
                    isUnique: false
                },
                {
                    name: 'username',
                    type: 'varchar',
                    isNullable: false,
                    isUnique: true
                },
                {
                    name: 'password',
                    type: 'varchar',
                    isNullable: false,
                    isUnique: false
                },
                {
                    name: 'email',
                    type: 'varchar',
                    isNullable: false,
                    isUnique: true
                },
                {
                    name: 'address',
                    type: 'varchar',
                    isNullable: false,
                    isUnique: false
                },
                {
                    name: 'phone',
                    type: 'varchar',
                    isNullable: false,
                    isUnique: true
                }
            ]
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('Participants')
    }

}
