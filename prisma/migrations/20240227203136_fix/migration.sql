/*
  Warnings:

  - You are about to drop the column `job_id` on the `employees` table. All the data in the column will be lost.
  - Added the required column `workShift` to the `employees` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "employees" DROP COLUMN "job_id",
ADD COLUMN     "workShift" TEXT NOT NULL;
