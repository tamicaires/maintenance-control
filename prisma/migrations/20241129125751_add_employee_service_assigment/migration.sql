/*
  Warnings:

  - You are about to drop the column `employee_id` on the `service_assignments` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "service_assignments" DROP CONSTRAINT "service_assignments_employee_id_fkey";

-- DropIndex
DROP INDEX "service_assignments_employee_id_idx";

-- AlterTable
ALTER TABLE "service_assignments" DROP COLUMN "employee_id";

-- CreateTable
CREATE TABLE "service_assignment_employee" (
    "id" TEXT NOT NULL,
    "service_assignment_id" TEXT NOT NULL,
    "employee_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "service_assignment_employee_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "service_assignment_employee_service_assignment_id_idx" ON "service_assignment_employee"("service_assignment_id");

-- CreateIndex
CREATE INDEX "service_assignment_employee_employee_id_idx" ON "service_assignment_employee"("employee_id");

-- AddForeignKey
ALTER TABLE "service_assignment_employee" ADD CONSTRAINT "service_assignment_employee_service_assignment_id_fkey" FOREIGN KEY ("service_assignment_id") REFERENCES "service_assignments"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "service_assignment_employee" ADD CONSTRAINT "service_assignment_employee_employee_id_fkey" FOREIGN KEY ("employee_id") REFERENCES "employees"("id") ON DELETE CASCADE ON UPDATE CASCADE;
