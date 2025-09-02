-- DropForeignKey
ALTER TABLE "public"."Products" DROP CONSTRAINT "Products_userId_fkey";

-- AddForeignKey
ALTER TABLE "public"."Products" ADD CONSTRAINT "Products_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
