-- AlterTable
ALTER TABLE "LegacyAccount" RENAME CONSTRAINT "Account_pkey" TO "LegacyAccount_pkey";

-- RenameIndex
ALTER INDEX "Account_transactionId_key" RENAME TO "LegacyAccount_transactionId_key";
