-- AlterTable
ALTER TABLE "public"."ListProducts" ADD COLUMN     "unit" TEXT NOT NULL DEFAULT 'unit';

-- AlterTable
ALTER TABLE "public"."Products" ADD COLUMN     "unit" TEXT NOT NULL DEFAULT 'unit';
