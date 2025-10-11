/*
  Warnings:

  - The `change_method` column on the `ChangeManager` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `payment_method` column on the `Payments` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "public"."Method" AS ENUM ('efectivoBs', 'divisa', 'transferencia', 'biopago');

-- AlterTable
ALTER TABLE "public"."ChangeManager" DROP COLUMN "change_method",
ADD COLUMN     "change_method" "public"."Method" NOT NULL DEFAULT 'efectivoBs';

-- AlterTable
ALTER TABLE "public"."Payments" DROP COLUMN "payment_method",
ADD COLUMN     "payment_method" "public"."Method" NOT NULL DEFAULT 'efectivoBs';
