/*
  Warnings:

  - A unique constraint covering the columns `[serial_number]` on the table `tires` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "tires_serial_number_key" ON "tires"("serial_number");
