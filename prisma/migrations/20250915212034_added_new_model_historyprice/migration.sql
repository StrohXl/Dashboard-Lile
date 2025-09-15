-- CreateTable
CREATE TABLE "public"."HistoryPrice" (
    "id" SERIAL NOT NULL,
    "price" DECIMAL(65,30) NOT NULL,
    "products_id" INTEGER,

    CONSTRAINT "HistoryPrice_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."HistoryPrice" ADD CONSTRAINT "HistoryPrice_products_id_fkey" FOREIGN KEY ("products_id") REFERENCES "public"."Products"("id") ON DELETE SET NULL ON UPDATE CASCADE;
