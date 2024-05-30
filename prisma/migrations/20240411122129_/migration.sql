/*
  Warnings:

  - A unique constraint covering the columns `[display_id]` on the table `work_orders` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `display_id` to the `work_orders` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "work_orders" ADD COLUMN     "display_id" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "work_orders_display_id_key" ON "work_orders"("display_id");
