-- AlterTable
ALTER TABLE "service_assignments" ADD COLUMN     "axle_id" TEXT;

-- AddForeignKey
ALTER TABLE "service_assignments" ADD CONSTRAINT "service_assignments_axle_id_fkey" FOREIGN KEY ("axle_id") REFERENCES "axles"("id") ON DELETE SET NULL ON UPDATE CASCADE;
