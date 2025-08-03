/*
  Warnings:

  - You are about to drop the column `description` on the `Products` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."Products" DROP COLUMN "description",
ADD COLUMN     "buysId" INTEGER;
