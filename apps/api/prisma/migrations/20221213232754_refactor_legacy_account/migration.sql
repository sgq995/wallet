/*
  Warnings:

  - You are about to drop the `Account` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
-- ALTER TABLE "Account" DROP CONSTRAINT "Account_profileId_fkey";
ALTER TABLE "Account" RENAME CONSTRAINT "Account_profileId_fkey" TO "LegacyAccount_profileId_fkey";

-- DropForeignKey
-- ALTER TABLE "Account" DROP CONSTRAINT "Account_transactionId_fkey";
ALTER TABLE "Account" RENAME CONSTRAINT "Account_transactionId_fkey" TO "LegacyAccount_transactionId_fkey";

-- DropForeignKey
-- ALTER TABLE "Entry" DROP CONSTRAINT "Entry_accountId_fkey";

-- DropTable
-- DROP TABLE "Account";

-- RenameTable
ALTER TABLE "Account" RENAME TO "LegacyAccount";

-- CreateTable
-- CREATE TABLE "LegacyAccount" (
--     "id" SERIAL NOT NULL,
--     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
--     "updatedAt" TIMESTAMP(3) NOT NULL,
--     "name" VARCHAR(255) NOT NULL,
--     "transactionId" INTEGER NOT NULL,
--     "profileId" INTEGER NOT NULL,

--     CONSTRAINT "LegacyAccount_pkey" PRIMARY KEY ("id")
-- );

-- CreateIndex
-- CREATE UNIQUE INDEX "LegacyAccount_transactionId_key" ON "LegacyAccount"("transactionId");

-- AddForeignKey
-- ALTER TABLE "Entry" ADD CONSTRAINT "Entry_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "LegacyAccount"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
-- ALTER TABLE "LegacyAccount" ADD CONSTRAINT "LegacyAccount_transactionId_fkey" FOREIGN KEY ("transactionId") REFERENCES "LegacyTransaction"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
-- ALTER TABLE "LegacyAccount" ADD CONSTRAINT "LegacyAccount_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "Profile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
