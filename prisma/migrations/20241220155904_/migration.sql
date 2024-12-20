/*
  Warnings:

  - Added the required column `checklist_category_id` to the `checklist_items` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "checklist_items" ADD COLUMN     "checklist_category_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "checklist_templates" ADD COLUMN     "icon" TEXT;

-- CreateTable
CREATE TABLE "checklist_categories" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "checklist_categories_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "checklist_categories_name_key" ON "checklist_categories"("name");

-- CreateIndex
CREATE INDEX "checklist_categories_name_idx" ON "checklist_categories"("name");

-- AddForeignKey
ALTER TABLE "checklist_items" ADD CONSTRAINT "checklist_items_checklist_category_id_fkey" FOREIGN KEY ("checklist_category_id") REFERENCES "checklist_categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
