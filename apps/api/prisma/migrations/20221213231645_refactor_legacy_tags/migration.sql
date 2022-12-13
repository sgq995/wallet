/*
  Warnings:

  - You are about to drop the `Tag` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Entry" DROP CONSTRAINT "Entry_tagId_fkey";

-- DropTable
DROP TABLE "Tag";

-- CreateTable
CREATE TABLE "LegacyTag" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "LegacyTag_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Entry" ADD CONSTRAINT "Entry_tagId_fkey" FOREIGN KEY ("tagId") REFERENCES "LegacyTag"("id") ON DELETE SET NULL ON UPDATE CASCADE;
