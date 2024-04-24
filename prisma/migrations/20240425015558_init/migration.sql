/*
  Warnings:

  - You are about to alter the column `answer` on the `ResponseItem` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(50)`.

*/
-- AlterTable
ALTER TABLE "ResponseItem" ALTER COLUMN "answer" SET DATA TYPE VARCHAR(50);
