/*
  Warnings:

  - You are about to drop the `Category` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Entry" DROP CONSTRAINT "Entry_categoryId_fkey";

-- DropForeignKey
ALTER TABLE "ProfilesCategories" DROP CONSTRAINT "ProfilesCategories_categoryId_fkey";

-- DropTable
-- DROP TABLE "Category";
ALTER TABLE "Category" RENAME TO "LegacyCategory";

-- CreateTable
-- CREATE TABLE "LegacyCategory" (
--     "id" SERIAL NOT NULL,
--     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
--     "updatedAt" TIMESTAMP(3) NOT NULL,
--     "name" VARCHAR(255) NOT NULL,

--     CONSTRAINT "LegacyCategory_pkey" PRIMARY KEY ("id")
-- );

-- AddForeignKey
-- ALTER TABLE "Entry" ADD CONSTRAINT "Entry_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "LegacyCategory"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
-- ALTER TABLE "ProfilesCategories" ADD CONSTRAINT "ProfilesCategories_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "LegacyCategory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
