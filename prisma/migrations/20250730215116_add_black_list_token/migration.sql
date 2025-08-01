-- CreateTable
CREATE TABLE "public"."BlackListToken" (
    "id" SERIAL NOT NULL,
    "token" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "BlackListToken_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "BlackListToken_token_key" ON "public"."BlackListToken"("token");

-- AddForeignKey
ALTER TABLE "public"."BlackListToken" ADD CONSTRAINT "BlackListToken_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
