import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialDataSeeding1755610121776 implements MigrationInterface {
  private categories = [
    'Planning',
    'Design',
    'Development',
    'Deployment'
  ];

  private subcategories = [
    'Q/A',
    'Requirements',
    'Troubleshooting',
    'Meeting'
  ];

  private catNames = this.categories.map((cat) => `('${cat}')`).join(',');
  private subcatNames = this.subcategories.map((cat) => `('${cat}')`).join(',');

  public async up(queryRunner: QueryRunner): Promise<void> {
    await Promise.all([
      queryRunner.query(`
      INSERT INTO category (name) VALUES ${this.catNames}
    `),
      queryRunner.query(`
      INSERT INTO subcategory (name) VALUES ${this.subcatNames}
    `)
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await Promise.all([
      queryRunner.query(`
        DELETE FROM category WHERE name IN ${this.catNames}
        `),
      queryRunner.query(`
        DELETE FROM subcategory WHERE name IN ${this.subcatNames}
        `)
    ]);
  }

}
