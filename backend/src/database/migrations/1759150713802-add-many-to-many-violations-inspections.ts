import { MigrationInterface, QueryRunner } from 'typeorm'

export class AddManyToManyViolationsInspections1759150713802
  implements MigrationInterface
{
  name = 'AddManyToManyViolationsInspections1759150713802'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "inspections_violations" (
        "inspections_id" uuid NOT NULL,
        "violations_id" uuid NOT NULL,
        CONSTRAINT "PK_5f59926dfd02b7dc21a8f8f5fbe" PRIMARY KEY ("inspections_id", "violations_id")
       )`,
    )
    await queryRunner.query(
      `CREATE INDEX "IDX_7aa30233227ab153e56b5e59dc" ON "inspections_violations" ("inspections_id") `,
    )
    await queryRunner.query(
      `CREATE INDEX "IDX_10698d3988488fecf4322d5119" ON "inspections_violations" ("violations_id") `,
    )
    await queryRunner.query(
      `ALTER TABLE "inspections_violations"
      ADD CONSTRAINT "FK_7aa30233227ab153e56b5e59dcd"
      FOREIGN KEY ("inspections_id")
      REFERENCES "inspections"("id")
      ON DELETE CASCADE ON UPDATE CASCADE`,
    )
    await queryRunner.query(
      `ALTER TABLE "inspections_violations"
      ADD CONSTRAINT "FK_10698d3988488fecf4322d51198"
      FOREIGN KEY ("violations_id")
      REFERENCES "violations"("id")
      ON DELETE NO ACTION ON UPDATE NO ACTION`,
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "inspections_violations" DROP CONSTRAINT "FK_10698d3988488fecf4322d51198"`,
    )
    await queryRunner.query(
      `ALTER TABLE "inspections_violations" DROP CONSTRAINT "FK_7aa30233227ab153e56b5e59dcd"`,
    )
    await queryRunner.query(
      `DROP INDEX "public"."IDX_10698d3988488fecf4322d5119"`,
    )
    await queryRunner.query(
      `DROP INDEX "public"."IDX_7aa30233227ab153e56b5e59dc"`,
    )
    await queryRunner.query(`DROP TABLE "inspections_violations"`)
  }
}
