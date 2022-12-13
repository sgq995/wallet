-- CreateTable
CREATE TABLE "Cash" (
    "id" SERIAL NOT NULL,
    "units" INTEGER NOT NULL DEFAULT 0,
    "cents" INTEGER NOT NULL DEFAULT 0,
    "currencyId" INTEGER NOT NULL,

    CONSTRAINT "Cash_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Cash" ADD CONSTRAINT "Cash_currencyId_fkey" FOREIGN KEY ("currencyId") REFERENCES "Currency"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
