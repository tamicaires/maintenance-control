/*
  Warnings:

  - You are about to drop the column `serialNumber` on the `tires` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[fire_number]` on the table `tires` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `serial_number` to the `tires` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "tires" DROP COLUMN "serialNumber",
ADD COLUMN     "serial_number" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "tires_fire_number_key" ON "tires"("fire_number");
