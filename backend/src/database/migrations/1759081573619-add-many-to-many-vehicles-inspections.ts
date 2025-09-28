import { MigrationInterface, QueryRunner } from 'typeorm'

export class AddManyToManyVehiclesInspections1759081573619
  implements MigrationInterface
{
  name = 'AddManyToManyVehiclesInspections1759081573619'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "inspections_vehicles" (
        "inspections_id" uuid NOT NULL,
        "vehicles_id" uuid NOT NULL,
        CONSTRAINT "PK_1f432fc60917d48fed8d2ac50e2" PRIMARY KEY ("inspections_id", "vehicles_id")
    )`,
    )
    await queryRunner.query(
      `CREATE INDEX "IDX_19f1743a5402efde6ebc246889" ON "inspections_vehicles" ("inspections_id") `,
    )
    await queryRunner.query(
      `CREATE INDEX "IDX_672ca1d7bb6bfc04454481d1da" ON "inspections_vehicles" ("vehicles_id") `,
    )
    await queryRunner.query(
      `ALTER TABLE "inspections_vehicles"
        ADD CONSTRAINT "FK_19f1743a5402efde6ebc246889b"
        FOREIGN KEY ("inspections_id")
        REFERENCES "inspections"("id")
        ON DELETE CASCADE ON UPDATE CASCADE`,
    )
    await queryRunner.query(
      `ALTER TABLE "inspections_vehicles"
        ADD CONSTRAINT "FK_672ca1d7bb6bfc04454481d1da8"
        FOREIGN KEY ("vehicles_id")
        REFERENCES "vehicles"("id")
        ON DELETE NO ACTION ON UPDATE NO ACTION`,
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "inspections_vehicles" DROP CONSTRAINT "FK_672ca1d7bb6bfc04454481d1da8"`,
    )
    await queryRunner.query(
      `ALTER TABLE "inspections_vehicles" DROP CONSTRAINT "FK_19f1743a5402efde6ebc246889b"`,
    )
    await queryRunner.query(
      `DROP INDEX "public"."IDX_672ca1d7bb6bfc04454481d1da"`,
    )
    await queryRunner.query(
      `DROP INDEX "public"."IDX_19f1743a5402efde6ebc246889"`,
    )
    await queryRunner.query(`DROP TABLE "inspections_vehicles"`)
  }
}
