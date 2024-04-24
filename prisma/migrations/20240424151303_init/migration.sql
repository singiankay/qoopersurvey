-- CreateEnum
CREATE TYPE "Role" AS ENUM ('User', 'Admin');

-- CreateEnum
CREATE TYPE "Type" AS ENUM ('ShortText', 'Number');

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'User',

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Form" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,

    CONSTRAINT "Form_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Question" (
    "id" SERIAL NOT NULL,
    "formId" INTEGER NOT NULL,
    "label" TEXT NOT NULL,
    "type" "Type" NOT NULL,

    CONSTRAINT "Question_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Response" (
    "id" SERIAL NOT NULL,
    "formId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Response_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ResponseItem" (
    "id" SERIAL NOT NULL,
    "responseId" INTEGER NOT NULL,
    "questionId" INTEGER NOT NULL,
    "answerInt" INTEGER,
    "answerShorttext" TEXT,

    CONSTRAINT "ResponseItem_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "Question" ADD CONSTRAINT "Question_formId_fkey" FOREIGN KEY ("formId") REFERENCES "Form"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Response" ADD CONSTRAINT "Response_formId_fkey" FOREIGN KEY ("formId") REFERENCES "Form"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Response" ADD CONSTRAINT "Response_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ResponseItem" ADD CONSTRAINT "ResponseItem_responseId_fkey" FOREIGN KEY ("responseId") REFERENCES "Response"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
