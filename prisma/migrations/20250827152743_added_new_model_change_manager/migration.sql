-- CreateTable
CREATE TABLE "public"."ChangeManager" (
    "id" SERIAL NOT NULL,
    "change_method" TEXT NOT NULL,
    "change_amount" DECIMAL(65,30) NOT NULL,
    "operation" INTEGER NOT NULL DEFAULT 0,
    "sale_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ChangeManager_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."ChangeManager" ADD CONSTRAINT "ChangeManager_sale_id_fkey" FOREIGN KEY ("sale_id") REFERENCES "public"."Sales"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
