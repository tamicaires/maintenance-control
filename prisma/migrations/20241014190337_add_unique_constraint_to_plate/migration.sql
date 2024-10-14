/*
  Warnings:

  - A unique constraint covering the columns `[plate]` on the table `trailers` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "trailers_plate_key" ON "trailers"("plate");
