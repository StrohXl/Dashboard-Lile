-- AlterTable
ALTER TABLE "public"."ListProducts" ADD COLUMN     "salesId" INTEGER;

-- CreateTable
CREATE TABLE "public"."Clients" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "createdAT" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAT" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Clients_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Sales" (
    "id" SERIAL NOT NULL,
    "total_price" INTEGER NOT NULL,
    "id_client" INTEGER NOT NULL,
    "createdAT" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAT" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Sales_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."ListProducts" ADD CONSTRAINT "ListProducts_salesId_fkey" FOREIGN KEY ("salesId") REFERENCES "public"."Sales"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Sales" ADD CONSTRAINT "Sales_id_client_fkey" FOREIGN KEY ("id_client") REFERENCES "public"."Clients"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
