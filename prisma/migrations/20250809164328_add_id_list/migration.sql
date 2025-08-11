-- AlterTable
ALTER TABLE "public"."ListProducts" ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "ListProducts_pkey" PRIMARY KEY ("id");
