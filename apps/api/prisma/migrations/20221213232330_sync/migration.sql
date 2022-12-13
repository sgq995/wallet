-- AlterTable
ALTER TABLE "LegacyCategory" RENAME CONSTRAINT "Category_pkey" TO "LegacyCategory_pkey";

-- AddForeignKey
ALTER TABLE "Entry" ADD CONSTRAINT "Entry_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "LegacyCategory"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProfilesCategories" ADD CONSTRAINT "ProfilesCategories_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "LegacyCategory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
