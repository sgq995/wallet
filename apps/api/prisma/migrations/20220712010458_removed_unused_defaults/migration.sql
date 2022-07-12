-- AlterTable
ALTER TABLE "Account" ALTER COLUMN "currencyId" DROP DEFAULT,
ALTER COLUMN "updatedAt" DROP DEFAULT;

-- AlterTable
ALTER TABLE "Category" ALTER COLUMN "updatedAt" DROP DEFAULT;

-- AlterTable
ALTER TABLE "Entry" ALTER COLUMN "transactionId" DROP DEFAULT;
