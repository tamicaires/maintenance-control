/*
  Warnings:

  - A unique constraint covering the columns `[serial_number]` on the table `parts` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `companyId` to the `parts` table without a default value. This is not possible if the table is not empty.
  - Added the required column `serial_number` to the `parts` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "parts" ADD COLUMN     "companyId" TEXT NOT NULL,
ADD COLUMN     "serial_number" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "trailers" ALTER COLUMN "position" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "parts_serial_number_key" ON "parts"("serial_number");

-- AddForeignKey
ALTER TABLE "parts" ADD CONSTRAINT "parts_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "companies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
