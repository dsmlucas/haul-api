import { MigrationInterface, QueryRunner } from 'typeorm'

export class CreateInspectionsTable1759008577574 implements MigrationInterface {
  name = 'CreateInspectionsTable1759008577574'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "inspections" (
        "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
        "created_at" TIMESTAMP NOT NULL DEFAULT now(),
        "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
        "deleted_at" TIMESTAMP,
        "inspection_date" TIMESTAMP NOT NULL,
        "report_state" character varying(2) NOT NULL,
        "report_number" character varying(255) NOT NULL,
        "level" integer NOT NULL,
        "time_weight" integer NOT NULL,
        "placarable_hm_veh_insp" character varying(5) NOT NULL,
        "hm_inspection" character varying(5) NOT NULL,
        CONSTRAINT "PK_a484980015782324454d8c88abe" PRIMARY KEY ("id")
      )`,
    )
    await queryRunner.query(
      `CREATE INDEX "IDX_921539a8b30ce9e95b59a16df8" ON "inspections" ("report_number") `,
    )
    await queryRunner.query(
      `CREATE INDEX "IDX_592f22aa6d95c4ad68abd9eea6" ON "inspections" ("inspection_date") `,
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DROP INDEX "public"."IDX_592f22aa6d95c4ad68abd9eea6"`,
    )
    await queryRunner.query(
      `DROP INDEX "public"."IDX_921539a8b30ce9e95b59a16df8"`,
    )
    await queryRunner.query(`DROP TABLE "inspections"`)
  }
}
