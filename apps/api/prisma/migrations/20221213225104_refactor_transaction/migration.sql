/*
  Warnings:

  - You are about to drop the `Transaction` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
-- ALTER TABLE "Account" RENAME CONSTRAINT "Account_transactionId_fkey";

-- DropForeignKey
-- ALTER TABLE "Entry" DROP CONSTRAINT "Entry_transactionId_fkey";

-- DropForeignKey
-- ALTER TABLE "Transaction" DROP CONSTRAINT "Transaction_currencyId_fkey";

-- RenameTable
ALTER TABLE "Transaction" RENAME TO "LegacyTransaction";

-- AddForeignKey
ALTER TABLE "LegacyTransaction" RENAME CONSTRAINT "Transaction_currencyId_fkey" TO "LegacyTransaction_currencyId_fkey";

-- AddForeignKey
-- ALTER TABLE "Entry" ADD CONSTRAINT "Entry_transactionId_fkey" FOREIGN KEY ("transactionId") REFERENCES "LegacyTransaction"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
-- ALTER TABLE "Account" ADD CONSTRAINT "Account_transactionId_fkey" FOREIGN KEY ("transactionId") REFERENCES "LegacyTransaction"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
