import { MigrationInterface, QueryRunner } from 'typeorm'

export class CreateVehiclesTable1759002135956 implements MigrationInterface {
  name = 'CreateVehiclesTable1759002135956'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "vehicles" (
        "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
        "created_at" TIMESTAMP NOT NULL DEFAULT now(),
        "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
        "deleted_at" TIMESTAMP,
        "vin" character varying(255) NOT NULL,
        "type" character varying(255) NOT NULL,
        "license_state" character varying(2) NOT NULL,
        "license_number" character varying(2) NOT NULL,
        CONSTRAINT "UQ_80f3b0409e6056f1d4abdf6579d" UNIQUE ("license_number"),
        CONSTRAINT "PK_18d8646b59304dce4af3a9e35b6" PRIMARY KEY ("id")
      )`,
    )

    await queryRunner.query(
      `CREATE INDEX "IDX_38bd4d6437d6bcdee1b14af034" ON "vehicles" ("type") `,
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DROP INDEX "public"."IDX_38bd4d6437d6bcdee1b14af034"`,
    )
    await queryRunner.query(`DROP TABLE "vehicles"`)
  }
}
