/*
  Warnings:

  - A unique constraint covering the columns `[nftId,userId]` on the table `favorites` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "favorites_nftId_userId_key" ON "favorites"("nftId", "userId");
