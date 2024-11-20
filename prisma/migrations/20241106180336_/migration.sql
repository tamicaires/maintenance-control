/*
  Warnings:

  - You are about to drop the column `axle_id` on the `parts` table. All the data in the column will be lost.
  - You are about to drop the column `trailer_id` on the `parts` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "parts" DROP CONSTRAINT "parts_axle_id_fkey";

-- DropForeignKey
ALTER TABLE "parts" DROP CONSTRAINT "parts_trailer_id_fkey";

-- DropIndex
DROP INDEX "parts_trailer_id_idx";

-- AlterTable
ALTER TABLE "part_requests" ADD COLUMN     "axle_id" TEXT,
ADD COLUMN     "trailer_id" TEXT;

-- AlterTable
ALTER TABLE "parts" DROP COLUMN "axle_id",
DROP COLUMN "trailer_id";

-- AddForeignKey
ALTER TABLE "part_requests" ADD CONSTRAINT "part_requests_trailer_id_fkey" FOREIGN KEY ("trailer_id") REFERENCES "trailers"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "part_requests" ADD CONSTRAINT "part_requests_axle_id_fkey" FOREIGN KEY ("axle_id") REFERENCES "axles"("id") ON DELETE SET NULL ON UPDATE CASCADE;
