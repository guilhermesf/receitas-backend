import { MigrationInterface, QueryRunner } from "typeorm";

export class Receitasculinarias1750121421675 implements MigrationInterface {
    name = 'Receitasculinarias1750121421675'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "category" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, CONSTRAINT "UQ_23c05c292c439d77b0de816b500" UNIQUE ("name"), CONSTRAINT "PK_9c4e4a89e3674fc9f382d733f03" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "ingredient" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, CONSTRAINT "UQ_b6802ac7fbd37aa71d856a95d8f" UNIQUE ("name"), CONSTRAINT "PK_6f1e945604a0b59f56a57570e98" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "planning" ("id" SERIAL NOT NULL, "date" date NOT NULL, "userId" integer, "recipeId" integer, CONSTRAINT "PK_039eb2fba66a12575b858717fbd" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "recipe" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "description" text NOT NULL, "userId" integer, "categoryId" integer, CONSTRAINT "PK_e365a2fedf57238d970e07825ca" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "recipe_ingredients_ingredient" ("recipeId" integer NOT NULL, "ingredientId" integer NOT NULL, CONSTRAINT "PK_6e193bb10a2cd8a65929edf7d07" PRIMARY KEY ("recipeId", "ingredientId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_b67e81a9afa83f2ee13440175c" ON "recipe_ingredients_ingredient" ("recipeId") `);
        await queryRunner.query(`CREATE INDEX "IDX_d2bbcf7bab477bfdcec65465c0" ON "recipe_ingredients_ingredient" ("ingredientId") `);
        await queryRunner.query(`ALTER TABLE "planning" ADD CONSTRAINT "FK_da7aae771071b1af9f6041dec50" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "planning" ADD CONSTRAINT "FK_6900eb627248a9b34a354b9451d" FOREIGN KEY ("recipeId") REFERENCES "recipe"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "recipe" ADD CONSTRAINT "FK_fe30fdc515f6c94d39cd4bbfa76" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "recipe" ADD CONSTRAINT "FK_991484dd8189182dafe91e44413" FOREIGN KEY ("categoryId") REFERENCES "category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "recipe_ingredients_ingredient" ADD CONSTRAINT "FK_b67e81a9afa83f2ee13440175ce" FOREIGN KEY ("recipeId") REFERENCES "recipe"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "recipe_ingredients_ingredient" ADD CONSTRAINT "FK_d2bbcf7bab477bfdcec65465c0c" FOREIGN KEY ("ingredientId") REFERENCES "ingredient"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "recipe_ingredients_ingredient" DROP CONSTRAINT "FK_d2bbcf7bab477bfdcec65465c0c"`);
        await queryRunner.query(`ALTER TABLE "recipe_ingredients_ingredient" DROP CONSTRAINT "FK_b67e81a9afa83f2ee13440175ce"`);
        await queryRunner.query(`ALTER TABLE "recipe" DROP CONSTRAINT "FK_991484dd8189182dafe91e44413"`);
        await queryRunner.query(`ALTER TABLE "recipe" DROP CONSTRAINT "FK_fe30fdc515f6c94d39cd4bbfa76"`);
        await queryRunner.query(`ALTER TABLE "planning" DROP CONSTRAINT "FK_6900eb627248a9b34a354b9451d"`);
        await queryRunner.query(`ALTER TABLE "planning" DROP CONSTRAINT "FK_da7aae771071b1af9f6041dec50"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_d2bbcf7bab477bfdcec65465c0"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_b67e81a9afa83f2ee13440175c"`);
        await queryRunner.query(`DROP TABLE "recipe_ingredients_ingredient"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "recipe"`);
        await queryRunner.query(`DROP TABLE "planning"`);
        await queryRunner.query(`DROP TABLE "ingredient"`);
        await queryRunner.query(`DROP TABLE "category"`);
    }

}
