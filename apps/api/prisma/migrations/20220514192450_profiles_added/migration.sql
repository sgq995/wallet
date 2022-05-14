/*
  Warnings:

  - Added the required column `profileId` to the `Account` table without a default value. This is not possible if the table is not empty.
  - Added the required column `profileId` to the `Entry` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Account" ADD COLUMN     "profileId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Entry" ADD COLUMN     "profileId" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "Profile" (
    "id" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Profile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProfilesCategories" (
    "profileId" INTEGER NOT NULL,
    "categoryId" INTEGER NOT NULL,

    CONSTRAINT "ProfilesCategories_pkey" PRIMARY KEY ("profileId","categoryId")
);

-- AddForeignKey
ALTER TABLE "Entry" ADD CONSTRAINT "Entry_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "Profile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Account" ADD CONSTRAINT "Account_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "Profile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProfilesCategories" ADD CONSTRAINT "ProfilesCategories_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "Profile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProfilesCategories" ADD CONSTRAINT "ProfilesCategories_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
