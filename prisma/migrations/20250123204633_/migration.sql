-- CreateEnum
CREATE TYPE "ChecklistStatus" AS ENUM ('PENDING', 'IN_PROGRESS', 'COMPLETED', 'CANCELED');

-- AlterTable
ALTER TABLE "checklists" ADD COLUMN     "status" "ChecklistStatus" NOT NULL DEFAULT 'PENDING';
