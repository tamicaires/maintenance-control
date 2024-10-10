/*
  Warnings:

  - You are about to drop the column `role` on the `users` table. All the data in the column will be lost.
  - Added the required column `workOrderId` to the `notes` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "RoleType" AS ENUM ('ADMIN', 'USER', 'GUEST');

-- AlterTable
ALTER TABLE "notes" ADD COLUMN     "workOrderId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "users" DROP COLUMN "role";

-- DropEnum
DROP TYPE "Role";

-- CreateTable
CREATE TABLE "roles" (
    "id" TEXT NOT NULL,
    "name" "RoleType" NOT NULL,

    CONSTRAINT "roles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_UserRoles" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "roles_name_key" ON "roles"("name");

-- CreateIndex
CREATE INDEX "roles_name_idx" ON "roles"("name");

-- CreateIndex
CREATE UNIQUE INDEX "_UserRoles_AB_unique" ON "_UserRoles"("A", "B");

-- CreateIndex
CREATE INDEX "_UserRoles_B_index" ON "_UserRoles"("B");

-- CreateIndex
CREATE INDEX "axle_history_axleId_idx" ON "axle_history"("axleId");

-- CreateIndex
CREATE INDEX "axle_history_workOrderId_idx" ON "axle_history"("workOrderId");

-- CreateIndex
CREATE INDEX "axles_trailerId_idx" ON "axles"("trailerId");

-- CreateIndex
CREATE INDEX "carries_companyId_idx" ON "carries"("companyId");

-- CreateIndex
CREATE INDEX "categories_name_idx" ON "categories"("name");

-- CreateIndex
CREATE INDEX "checklist_items_checklistId_idx" ON "checklist_items"("checklistId");

-- CreateIndex
CREATE INDEX "checklist_templates_companyId_idx" ON "checklist_templates"("companyId");

-- CreateIndex
CREATE INDEX "checklists_workOrderId_idx" ON "checklists"("workOrderId");

-- CreateIndex
CREATE INDEX "checklists_templateId_idx" ON "checklists"("templateId");

-- CreateIndex
CREATE INDEX "companies_name_idx" ON "companies"("name");

-- CreateIndex
CREATE INDEX "companies_email_idx" ON "companies"("email");

-- CreateIndex
CREATE INDEX "companies_cnpj_idx" ON "companies"("cnpj");

-- CreateIndex
CREATE INDEX "employees_jobTitleId_idx" ON "employees"("jobTitleId");

-- CreateIndex
CREATE INDEX "fleets_carrier_id_idx" ON "fleets"("carrier_id");

-- CreateIndex
CREATE INDEX "fleets_companyId_idx" ON "fleets"("companyId");

-- CreateIndex
CREATE INDEX "job_titles_job_title_idx" ON "job_titles"("job_title");

-- CreateIndex
CREATE INDEX "notes_userId_idx" ON "notes"("userId");

-- CreateIndex
CREATE INDEX "notes_workOrderId_idx" ON "notes"("workOrderId");

-- CreateIndex
CREATE INDEX "parts_trailerId_idx" ON "parts"("trailerId");

-- CreateIndex
CREATE INDEX "parts_categoryId_idx" ON "parts"("categoryId");

-- CreateIndex
CREATE INDEX "service_assignments_word_order_id_idx" ON "service_assignments"("word_order_id");

-- CreateIndex
CREATE INDEX "service_assignments_employee_id_idx" ON "service_assignments"("employee_id");

-- CreateIndex
CREATE INDEX "service_assignments_serviceId_idx" ON "service_assignments"("serviceId");

-- CreateIndex
CREATE INDEX "tires_axleId_idx" ON "tires"("axleId");

-- CreateIndex
CREATE INDEX "trailers_fleetId_idx" ON "trailers"("fleetId");

-- CreateIndex
CREATE INDEX "users_email_idx" ON "users"("email");

-- CreateIndex
CREATE INDEX "users_companyId_idx" ON "users"("companyId");

-- CreateIndex
CREATE INDEX "work_orders_fleetId_idx" ON "work_orders"("fleetId");

-- CreateIndex
CREATE INDEX "work_orders_userId_idx" ON "work_orders"("userId");

-- CreateIndex
CREATE INDEX "work_orders_companyId_idx" ON "work_orders"("companyId");

-- AddForeignKey
ALTER TABLE "notes" ADD CONSTRAINT "notes_workOrderId_fkey" FOREIGN KEY ("workOrderId") REFERENCES "work_orders"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserRoles" ADD CONSTRAINT "_UserRoles_A_fkey" FOREIGN KEY ("A") REFERENCES "roles"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserRoles" ADD CONSTRAINT "_UserRoles_B_fkey" FOREIGN KEY ("B") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
