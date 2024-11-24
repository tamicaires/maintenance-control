/*
  Warnings:

  - Added the required column `trailer_id` to the `service_assignments` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "service_assignments" ADD COLUMN     "trailer_id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "service_assignments" ADD CONSTRAINT "service_assignments_trailer_id_fkey" FOREIGN KEY ("trailer_id") REFERENCES "trailers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
