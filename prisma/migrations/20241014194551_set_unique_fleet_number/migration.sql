/*
  Warnings:

  - A unique constraint covering the columns `[fleetNumber]` on the table `fleets` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[plate]` on the table `fleets` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "fleets_fleetNumber_key" ON "fleets"("fleetNumber");

-- CreateIndex
CREATE UNIQUE INDEX "fleets_plate_key" ON "fleets"("plate");
