-- CreateTable
CREATE TABLE "public"."Buys" (
    "id" SERIAL NOT NULL,
    "createdAT" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAT" TIMESTAMP(3) NOT NULL,
    "userId" INTEGER,

    CONSTRAINT "Buys_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."Products" ADD CONSTRAINT "Products_buysId_fkey" FOREIGN KEY ("buysId") REFERENCES "public"."Buys"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Buys" ADD CONSTRAINT "Buys_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
