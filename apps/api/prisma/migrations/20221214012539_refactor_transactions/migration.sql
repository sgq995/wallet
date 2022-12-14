/*
  Warnings:

  - You are about to drop the column `cashId` on the `Transaction` table. All the data in the column will be lost.
  - You are about to drop the column `periodicityId` on the `Transaction` table. All the data in the column will be lost.
  - You are about to drop the column `typeId` on the `Transaction` table. All the data in the column will be lost.
  - You are about to drop the `Cash` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Periodicity` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `TransactionType` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `currencyId` to the `Transaction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `Transaction` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Cash" DROP CONSTRAINT "Cash_currencyId_fkey";

-- DropForeignKey
ALTER TABLE "Transaction" DROP CONSTRAINT "Transaction_cashId_fkey";

-- DropForeignKey
ALTER TABLE "Transaction" DROP CONSTRAINT "Transaction_periodicityId_fkey";

-- DropForeignKey
ALTER TABLE "Transaction" DROP CONSTRAINT "Transaction_typeId_fkey";

-- AlterTable
ALTER TABLE "Transaction" DROP COLUMN "cashId",
DROP COLUMN "periodicityId",
DROP COLUMN "typeId",
ADD COLUMN     "cents" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "currencyId" INTEGER NOT NULL,
ADD COLUMN     "periodicity" TEXT,
ADD COLUMN     "type" TEXT NOT NULL,
ADD COLUMN     "units" INTEGER NOT NULL DEFAULT 0;

-- DropTable
DROP TABLE "Cash";

-- DropTable
DROP TABLE "Periodicity";

-- DropTable
DROP TABLE "TransactionType";

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_currencyId_fkey" FOREIGN KEY ("currencyId") REFERENCES "Currency"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
