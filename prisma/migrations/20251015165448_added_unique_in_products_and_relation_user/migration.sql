/*
  Warnings:

  - You are about to drop the `Products` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."HistoryPrice" DROP CONSTRAINT "HistoryPrice_products_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."Products" DROP CONSTRAINT "Products_userId_fkey";

-- DropForeignKey
ALTER TABLE "public"."_BuysToProducts" DROP CONSTRAINT "_BuysToProducts_B_fkey";

-- DropForeignKey
ALTER TABLE "public"."_ProductsToSales" DROP CONSTRAINT "_ProductsToSales_A_fkey";

-- AlterTable
ALTER TABLE "public"."ChangeManager" ADD COLUMN     "userId" INTEGER;

-- AlterTable
ALTER TABLE "public"."Clients" ADD COLUMN     "userId" INTEGER;

-- AlterTable
ALTER TABLE "public"."Payments" ADD COLUMN     "userId" INTEGER;

-- AlterTable
ALTER TABLE "public"."Sales" ADD COLUMN     "userId" INTEGER;

-- DropTable
DROP TABLE "public"."Products";

-- CreateTable
CREATE TABLE "public"."products" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "price" DECIMAL(65,30) NOT NULL DEFAULT 0,
    "stock" DECIMAL(65,30) NOT NULL DEFAULT 0,
    "createdAT" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAT" TIMESTAMP(3) NOT NULL,
    "userId" INTEGER,
    "unit" TEXT NOT NULL DEFAULT 'unit',
    "iva" BOOLEAN NOT NULL DEFAULT false,
    "salesId" INTEGER,

    CONSTRAINT "products_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "products_name_userId_key" ON "public"."products"("name", "userId");

-- AddForeignKey
ALTER TABLE "public"."products" ADD CONSTRAINT "products_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."HistoryPrice" ADD CONSTRAINT "HistoryPrice_products_id_fkey" FOREIGN KEY ("products_id") REFERENCES "public"."products"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Clients" ADD CONSTRAINT "Clients_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Sales" ADD CONSTRAINT "Sales_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Payments" ADD CONSTRAINT "Payments_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."ChangeManager" ADD CONSTRAINT "ChangeManager_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."_ProductsToSales" ADD CONSTRAINT "_ProductsToSales_A_fkey" FOREIGN KEY ("A") REFERENCES "public"."products"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."_BuysToProducts" ADD CONSTRAINT "_BuysToProducts_B_fkey" FOREIGN KEY ("B") REFERENCES "public"."products"("id") ON DELETE CASCADE ON UPDATE CASCADE;
