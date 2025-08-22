/*
  Warnings:

  - You are about to drop the column `createdAT` on the `Clients` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAT` on the `Clients` table. All the data in the column will be lost.
  - You are about to drop the column `createdAT` on the `Sales` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAT` on the `Sales` table. All the data in the column will be lost.
  - Added the required column `updated_at` to the `Clients` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `Sales` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Clients" DROP COLUMN "createdAT",
DROP COLUMN "updatedAT",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "public"."Sales" DROP COLUMN "createdAT",
DROP COLUMN "updatedAT",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;
