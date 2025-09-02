-- DropForeignKey
ALTER TABLE "public"."Buys" DROP CONSTRAINT "Buys_userId_fkey";

-- AddForeignKey
ALTER TABLE "public"."Buys" ADD CONSTRAINT "Buys_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
