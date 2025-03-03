-- AlterTable
ALTER TABLE "Events" ADD COLUMN     "checklistId" TEXT,
ADD COLUMN     "partRequestId" TEXT;

-- AddForeignKey
ALTER TABLE "Events" ADD CONSTRAINT "Events_checklistId_fkey" FOREIGN KEY ("checklistId") REFERENCES "checklists"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Events" ADD CONSTRAINT "Events_partRequestId_fkey" FOREIGN KEY ("partRequestId") REFERENCES "part_requests"("id") ON DELETE SET NULL ON UPDATE CASCADE;
