import { MigrationInterface, QueryRunner } from "typeorm";

export class UserAddImage1698696264457 implements MigrationInterface {
    name = 'UserAddImage1698696264457'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`users\` ADD \`image\` varchar(255) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`image\``);
    }

}