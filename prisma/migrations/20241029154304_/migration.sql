/*
  Warnings:

  - Made the column `work_order_id` on table `part_requests` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "part_requests" DROP CONSTRAINT "part_requests_work_order_id_fkey";

-- AlterTable
ALTER TABLE "part_requests" ALTER COLUMN "work_order_id" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "part_requests" ADD CONSTRAINT "part_requests_work_order_id_fkey" FOREIGN KEY ("work_order_id") REFERENCES "work_orders"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
