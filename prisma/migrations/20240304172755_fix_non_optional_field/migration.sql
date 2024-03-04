/*
  Warnings:

  - Made the column `severity_level` on table `work_orders` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "work_orders" ALTER COLUMN "severity_level" SET NOT NULL;
