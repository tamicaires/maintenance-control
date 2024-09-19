/*
  Warnings:

  - You are about to drop the column `status` on the `employees` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `fleets` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "carries" ADD COLUMN     "is_active" BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE "employees" DROP COLUMN "status",
ADD COLUMN     "is_active" BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE "fleets" DROP COLUMN "status",
ADD COLUMN     "is_active" BOOLEAN NOT NULL DEFAULT true;
