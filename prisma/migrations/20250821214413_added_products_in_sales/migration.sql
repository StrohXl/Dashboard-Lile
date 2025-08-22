-- AlterTable
ALTER TABLE "public"."Products" ADD COLUMN     "salesId" INTEGER;

-- CreateTable
CREATE TABLE "public"."_ProductsToSales" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_ProductsToSales_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_ProductsToSales_B_index" ON "public"."_ProductsToSales"("B");

-- AddForeignKey
ALTER TABLE "public"."_ProductsToSales" ADD CONSTRAINT "_ProductsToSales_A_fkey" FOREIGN KEY ("A") REFERENCES "public"."Products"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."_ProductsToSales" ADD CONSTRAINT "_ProductsToSales_B_fkey" FOREIGN KEY ("B") REFERENCES "public"."Sales"("id") ON DELETE CASCADE ON UPDATE CASCADE;
