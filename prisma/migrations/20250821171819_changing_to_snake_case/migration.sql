/*
  Warnings:

  - You are about to drop the column `createdAT` on the `Payments` table. All the data in the column will be lost.
  - You are about to drop the column `salesId` on the `Payments` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."Payments" DROP CONSTRAINT "Payments_salesId_fkey";

-- AlterTable
ALTER TABLE "public"."Payments" DROP COLUMN "createdAT",
DROP COLUMN "salesId",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "sales_id" INTEGER;

-- AddForeignKey
ALTER TABLE "public"."Payments" ADD CONSTRAINT "Payments_sales_id_fkey" FOREIGN KEY ("sales_id") REFERENCES "public"."Sales"("id") ON DELETE SET NULL ON UPDATE CASCADE;
