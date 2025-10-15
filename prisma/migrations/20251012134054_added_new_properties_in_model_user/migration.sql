-- CreateEnum
CREATE TYPE "public"."Roles" AS ENUM ('ADMIN', 'CASHIER');

-- AlterTable
ALTER TABLE "public"."User" ADD COLUMN     "last_name" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "name" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "role" "public"."Roles" NOT NULL DEFAULT 'ADMIN';
