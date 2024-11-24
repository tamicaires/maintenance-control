-- CreateEnum
CREATE TYPE "ServiceAssignmentStatus" AS ENUM ('PENDING', 'IN_PROGRESS', 'COMPLETED');

-- AlterTable
ALTER TABLE "service_assignments" ADD COLUMN     "status" "ServiceAssignmentStatus" NOT NULL DEFAULT 'PENDING';
