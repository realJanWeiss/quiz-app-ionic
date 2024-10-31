import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitDB1730373739967 implements MigrationInterface {
  name = 'InitDB1730373739967';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`quizzes\` (\`id\` uuid NOT NULL, \`quizName\` varchar(255) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`version\` int NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`questions\` (\`id\` uuid NOT NULL, \`title\` varchar(255) NOT NULL, \`a1\` varchar(255) NOT NULL, \`a2\` varchar(255) NOT NULL, \`a3\` varchar(255) NOT NULL, \`a4\` varchar(255) NOT NULL, \`correct\` int NOT NULL, \`sortIdx\` int NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`version\` int NOT NULL, \`quizId\` uuid NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `ALTER TABLE \`questions\` ADD CONSTRAINT \`FK_35d54f06d12ea78d4842aed6b6d\` FOREIGN KEY (\`quizId\`) REFERENCES \`quizzes\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`questions\` DROP FOREIGN KEY \`FK_35d54f06d12ea78d4842aed6b6d\``,
    );
    await queryRunner.query(`DROP TABLE \`questions\``);
    await queryRunner.query(`DROP TABLE \`quizzes\``);
  }
}
