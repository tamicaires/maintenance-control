-- AlterEnum
ALTER TYPE "Role" ADD VALUE 'MAINTENANCE_CONSULTER';

-- AlterTable
ALTER TABLE "work_orders" ADD COLUMN     "is_cancelled" BOOLEAN NOT NULL DEFAULT false;
