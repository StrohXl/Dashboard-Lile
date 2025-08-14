-- CreateIndex
CREATE INDEX "Products_name_idx" ON "public"."Products" USING HASH ("name");
