/*
  Warnings:

  - You are about to drop the column `buysId` on the `Products` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."Products" DROP CONSTRAINT "Products_buysId_fkey";

-- AlterTable
ALTER TABLE "public"."Products" DROP COLUMN "buysId";

-- CreateTable
CREATE TABLE "public"."_BuysToProducts" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_BuysToProducts_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_BuysToProducts_B_index" ON "public"."_BuysToProducts"("B");

-- AddForeignKey
ALTER TABLE "public"."_BuysToProducts" ADD CONSTRAINT "_BuysToProducts_A_fkey" FOREIGN KEY ("A") REFERENCES "public"."Buys"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."_BuysToProducts" ADD CONSTRAINT "_BuysToProducts_B_fkey" FOREIGN KEY ("B") REFERENCES "public"."Products"("id") ON DELETE CASCADE ON UPDATE CASCADE;
