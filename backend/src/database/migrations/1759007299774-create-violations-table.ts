import { MigrationInterface, QueryRunner } from 'typeorm'

export class CreateViolationsTable1759007299774 implements MigrationInterface {
  name = 'CreateViolationsTable1759007299774'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "violations" (
        "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
        "created_at" TIMESTAMP NOT NULL DEFAULT now(),
        "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
        "deleted_at" TIMESTAMP,
        "code" character varying(255) NOT NULL,
        "description" character varying(255) NOT NULL,
        "oos" character varying(1) NOT NULL,
        "time_severity_weight" integer NOT NULL,
        "basic" character varying(255) NOT NULL,
        "unit" character varying(1) NOT NULL,
        "convicted_dif_charge" character varying(1) NOT NULL,
        CONSTRAINT "UQ_8f1cd08e22ca970215a98a6a346" UNIQUE ("code"),
        CONSTRAINT "PK_a2aa2d655842de3c02315ba6073" PRIMARY KEY ("id")
      )`,
    )
    await queryRunner.query(
      `CREATE INDEX "IDX_8f1cd08e22ca970215a98a6a34" ON "violations" ("code") `,
    )
    await queryRunner.query(
      `CREATE INDEX "IDX_4c10aa99a86e95e763d3cfab8a" ON "violations" ("basic") `,
    )
    await queryRunner.query(
      `CREATE INDEX "IDX_f2d50e707eecdedd9393bc5420" ON "violations" ("oos",
      "unit") `,
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DROP INDEX "public"."IDX_f2d50e707eecdedd9393bc5420"`,
    )
    await queryRunner.query(
      `DROP INDEX "public"."IDX_4c10aa99a86e95e763d3cfab8a"`,
    )
    await queryRunner.query(
      `DROP INDEX "public"."IDX_8f1cd08e22ca970215a98a6a34"`,
    )
    await queryRunner.query(`DROP TABLE "violations"`)
  }
}
