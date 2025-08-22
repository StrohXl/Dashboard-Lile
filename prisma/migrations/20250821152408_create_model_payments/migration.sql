-- AlterTable
ALTER TABLE "public"."Sales" ADD COLUMN     "debt" DECIMAL(65,30) NOT NULL DEFAULT 0,
ALTER COLUMN "total_price" SET DATA TYPE DECIMAL(65,30);

-- CreateTable
CREATE TABLE "public"."Payments" (
    "id" SERIAL NOT NULL,
    "payment_method" TEXT NOT NULL,
    "payment_amount" DECIMAL(65,30) NOT NULL,
    "salesId" INTEGER,
    "createdAT" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Payments_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."Payments" ADD CONSTRAINT "Payments_salesId_fkey" FOREIGN KEY ("salesId") REFERENCES "public"."Sales"("id") ON DELETE SET NULL ON UPDATE CASCADE;
