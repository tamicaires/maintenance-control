/*
  Warnings:

  - Added the required column `userId` to the `work_orders` table without a default value. This is not possible if the table is not empty.
  - Made the column `severity_level` on table `work_orders` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "work_orders" ADD COLUMN     "userId" TEXT NOT NULL,
ALTER COLUMN "severity_level" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "work_orders" ADD CONSTRAINT "work_orders_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
