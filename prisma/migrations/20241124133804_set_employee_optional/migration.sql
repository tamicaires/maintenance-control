-- DropForeignKey
ALTER TABLE "service_assignments" DROP CONSTRAINT "service_assignments_employee_id_fkey";

-- AlterTable
ALTER TABLE "service_assignments" ALTER COLUMN "employee_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "service_assignments" ADD CONSTRAINT "service_assignments_employee_id_fkey" FOREIGN KEY ("employee_id") REFERENCES "employees"("id") ON DELETE SET NULL ON UPDATE CASCADE;
