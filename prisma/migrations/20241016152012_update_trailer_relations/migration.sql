/*
  Warnings:

  - Added the required column `companyId` to the `trailers` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "trailers" DROP CONSTRAINT "trailers_fleetId_fkey";

-- AlterTable
ALTER TABLE "trailers" ADD COLUMN     "companyId" TEXT NOT NULL,
ALTER COLUMN "fleetId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "trailers" ADD CONSTRAINT "trailers_fleetId_fkey" FOREIGN KEY ("fleetId") REFERENCES "fleets"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "trailers" ADD CONSTRAINT "trailers_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "companies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
