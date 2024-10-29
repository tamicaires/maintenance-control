/*
  Warnings:

  - You are about to drop the column `approved_at` on the `part_requests` table. All the data in the column will be lost.
  - You are about to drop the column `is_rejected` on the `part_requests` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "part_requests" DROP COLUMN "approved_at",
DROP COLUMN "is_rejected",
ADD COLUMN     "handled_at" TIMESTAMP(3);
