-- AlterTable
ALTER TABLE "Transaction" ADD COLUMN     "description" TEXT;

-- CreateTable
CREATE TABLE "Asset" (
    "id" SERIAL NOT NULL,
    "acquisitionId" INTEGER NOT NULL,
    "sellingId" INTEGER,

    CONSTRAINT "Asset_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Asset_acquisitionId_key" ON "Asset"("acquisitionId");

-- CreateIndex
CREATE UNIQUE INDEX "Asset_sellingId_key" ON "Asset"("sellingId");

-- AddForeignKey
ALTER TABLE "Asset" ADD CONSTRAINT "Asset_acquisitionId_fkey" FOREIGN KEY ("acquisitionId") REFERENCES "Transaction"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Asset" ADD CONSTRAINT "Asset_sellingId_fkey" FOREIGN KEY ("sellingId") REFERENCES "Transaction"("id") ON DELETE SET NULL ON UPDATE CASCADE;
