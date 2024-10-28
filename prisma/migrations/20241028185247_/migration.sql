/*
  Warnings:

  - Made the column `is_rejected` on table `part_requests` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "part_requests" ALTER COLUMN "is_rejected" SET NOT NULL,
ALTER COLUMN "is_rejected" SET DEFAULT false;
