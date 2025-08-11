-- CreateTable
CREATE TABLE "public"."ListProducts" (
    "name" TEXT NOT NULL,
    "price" DECIMAL(65,30) NOT NULL DEFAULT 0,
    "stock" INTEGER NOT NULL DEFAULT 0,
    "createdAT" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAT" TIMESTAMP(3) NOT NULL,
    "buysId" INTEGER
);

-- CreateIndex
CREATE UNIQUE INDEX "ListProducts_name_key" ON "public"."ListProducts"("name");

-- AddForeignKey
ALTER TABLE "public"."ListProducts" ADD CONSTRAINT "ListProducts_buysId_fkey" FOREIGN KEY ("buysId") REFERENCES "public"."Buys"("id") ON DELETE SET NULL ON UPDATE CASCADE;
