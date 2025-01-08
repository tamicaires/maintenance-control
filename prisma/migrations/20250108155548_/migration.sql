/*
  Warnings:

  - You are about to drop the column `checklist_category_id` on the `checklist_items` table. All the data in the column will be lost.
  - Added the required column `template_id` to the `checklist_categories` table without a default value. This is not possible if the table is not empty.
  - Added the required column `checklist_category_id` to the `checklist_item_templates` table without a default value. This is not possible if the table is not empty.
  - Added the required column `weight` to the `checklist_item_templates` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "checklist_items" DROP CONSTRAINT "checklist_items_checklist_category_id_fkey";

-- AlterTable
ALTER TABLE "checklist_categories" ADD COLUMN     "template_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "checklist_item_templates" ADD COLUMN     "checklist_category_id" TEXT NOT NULL,
ADD COLUMN     "weight" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "checklist_items" DROP COLUMN "checklist_category_id";

-- AddForeignKey
ALTER TABLE "checklist_item_templates" ADD CONSTRAINT "checklist_item_templates_checklist_category_id_fkey" FOREIGN KEY ("checklist_category_id") REFERENCES "checklist_categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "checklist_categories" ADD CONSTRAINT "checklist_categories_template_id_fkey" FOREIGN KEY ("template_id") REFERENCES "checklist_templates"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
