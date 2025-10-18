/*
  Warnings:

  - A unique constraint covering the columns `[ci,userId]` on the table `Clients` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "public"."Clients_ci_key";

-- CreateIndex
CREATE UNIQUE INDEX "Clients_ci_userId_key" ON "public"."Clients"("ci", "userId");
