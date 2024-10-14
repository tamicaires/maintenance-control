/*
  Warnings:

  - The values [USER] on the enum `RoleType` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "RoleType_new" AS ENUM ('ADMIN', 'SUPER_ADMIN', 'REPORT_MANAGER', 'REPORT_VIEWER', 'GENERAL_VIEWER', 'MAINTENANCE_MANAGER', 'MAINTENANCE_CONSULTANT', 'TIRE_CONSULTANT', 'PARTS_CONSULTANT', 'PARTS_MANAGER', 'GUEST');
ALTER TABLE "memberships" ALTER COLUMN "role" TYPE "RoleType_new"[] USING ("role"::text::"RoleType_new"[]);
ALTER TABLE "roles" ALTER COLUMN "name" TYPE "RoleType_new" USING ("name"::text::"RoleType_new");
ALTER TYPE "RoleType" RENAME TO "RoleType_old";
ALTER TYPE "RoleType_new" RENAME TO "RoleType";
DROP TYPE "RoleType_old";
COMMIT;
