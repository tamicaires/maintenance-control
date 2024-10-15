/*
  Warnings:

  - Made the column `part_number` on table `parts` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "parts" ALTER COLUMN "part_number" SET NOT NULL;
