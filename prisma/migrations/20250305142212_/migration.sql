/*
  Warnings:

  - A unique constraint covering the columns `[position]` on the table `boxes` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "boxes" ADD COLUMN     "position" INTEGER;

-- AlterTable
ALTER TABLE "services" ADD COLUMN     "weight" INTEGER;

-- CreateIndex
CREATE UNIQUE INDEX "boxes_position_key" ON "boxes"("position");
