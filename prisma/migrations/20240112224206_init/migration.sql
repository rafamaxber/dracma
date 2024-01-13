/*
  Warnings:

  - A unique constraint covering the columns `[idExternal]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "idExternal" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "User_idExternal_key" ON "User"("idExternal");
