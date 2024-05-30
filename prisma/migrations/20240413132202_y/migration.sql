/*
  Warnings:

  - The values [Em fila,Em manutenção,Aguardando peça,Finalizado] on the enum `MaintenanceStatus` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "MaintenanceStatus_new" AS ENUM ('Fila', 'Manutencao', 'AguardandoPeca', 'Finalizada');
ALTER TABLE "work_orders" ALTER COLUMN "status" TYPE "MaintenanceStatus_new" USING ("status"::text::"MaintenanceStatus_new");
ALTER TYPE "MaintenanceStatus" RENAME TO "MaintenanceStatus_old";
ALTER TYPE "MaintenanceStatus_new" RENAME TO "MaintenanceStatus";
DROP TYPE "MaintenanceStatus_old";
COMMIT;
