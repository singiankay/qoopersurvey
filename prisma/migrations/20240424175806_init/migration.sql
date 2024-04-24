/*
  Warnings:

  - You are about to drop the column `answerInt` on the `ResponseItem` table. All the data in the column will be lost.
  - You are about to drop the column `answerShorttext` on the `ResponseItem` table. All the data in the column will be lost.
  - Added the required column `answer` to the `ResponseItem` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ResponseItem" DROP COLUMN "answerInt",
DROP COLUMN "answerShorttext",
ADD COLUMN     "answer" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "ResponseItem" ADD CONSTRAINT "ResponseItem_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "Question"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
