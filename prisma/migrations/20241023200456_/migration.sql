-- CreateEnum
CREATE TYPE "RoleType" AS ENUM ('ADMIN', 'SUPER_ADMIN', 'REPORT_MANAGER', 'REPORT_VIEWER', 'GENERAL_VIEWER', 'MAINTENANCE_MANAGER', 'MAINTENANCE_CONSULTANT', 'TIRE_CONSULTANT', 'PARTS_CONSULTANT', 'PARTS_MANAGER', 'GUEST');

-- CreateEnum
CREATE TYPE "AxleType" AS ENUM ('Tracionado', 'Livre', 'Direcional');

-- CreateEnum
CREATE TYPE "PartLocation" AS ENUM ('ESTOQUE', 'APLICADO', 'RECUPERACAO');

-- CreateEnum
CREATE TYPE "PartStatus" AS ENUM ('NOVO', 'RECUPERADO');

-- CreateEnum
CREATE TYPE "RequestStatus" AS ENUM ('PENDING', 'APPROVED', 'REJECTED', 'DELIVERED');

-- CreateEnum
CREATE TYPE "TireCondition" AS ENUM ('NOVO', 'RECUPERADO', 'DANIFICADO', 'DESCARTE');

-- CreateEnum
CREATE TYPE "TireLocation" AS ENUM ('ESTOQUE', 'RECUPERACAO', 'APLICADO');

-- CreateEnum
CREATE TYPE "ServiceCategory" AS ENUM ('Estrutura', 'Elétrica', 'Pneumática', 'Freios', 'Soldagem', 'Borracharia');

-- CreateEnum
CREATE TYPE "MaintenanceStatus" AS ENUM ('Fila', 'Manutencao', 'AguardandoPeca', 'Finalizada');

-- CreateEnum
CREATE TYPE "TypeOfMaintenance" AS ENUM ('Preditiva', 'Preventiva', 'Corretiva');

-- CreateTable
CREATE TABLE "companies" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "cnpj" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "address" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "companies_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "memberships" (
    "id" TEXT NOT NULL,
    "role" "RoleType"[],
    "companyId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "memberships_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "notes" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "user_id" TEXT NOT NULL,
    "work_order_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "notes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "carries" (
    "id" TEXT NOT NULL,
    "carrier_name" TEXT NOT NULL,
    "manager_name" TEXT NOT NULL,
    "manager_phone" TEXT NOT NULL,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "company_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "carries_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "vehicles" (
    "id" TEXT NOT NULL,
    "plate" TEXT NOT NULL,
    "model" TEXT NOT NULL,
    "brand" TEXT NOT NULL,
    "year" TEXT NOT NULL,
    "color" TEXT,
    "km" TEXT NOT NULL,
    "power" DOUBLE PRECISION NOT NULL,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "fleet_id" TEXT,
    "company_id" TEXT NOT NULL,

    CONSTRAINT "vehicles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "fleets" (
    "id" TEXT NOT NULL,
    "fleet_number" TEXT NOT NULL,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "carrier_id" TEXT NOT NULL,
    "company_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "fleets_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "trailers" (
    "id" TEXT NOT NULL,
    "plate" TEXT NOT NULL,
    "position" INTEGER,
    "fleet_id" TEXT,
    "company_id" TEXT NOT NULL,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "trailers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "axles" (
    "id" TEXT NOT NULL,
    "position" TEXT NOT NULL,
    "capacity" DOUBLE PRECISION,
    "type" "AxleType" NOT NULL,
    "trailer_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "axles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "parts" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "part_number" TEXT NOT NULL,
    "serial_number" TEXT NOT NULL,
    "model" TEXT,
    "brand" TEXT,
    "supplier" TEXT,
    "cost_price" DOUBLE PRECISION NOT NULL,
    "selling_price" DOUBLE PRECISION,
    "stock_quantity" INTEGER NOT NULL DEFAULT 0,
    "location" "PartLocation" NOT NULL,
    "status" "PartStatus" NOT NULL DEFAULT 'NOVO',
    "category_id" TEXT NOT NULL,
    "trailer_id" TEXT,
    "axle_id" TEXT,
    "company_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "parts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "part_categories" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "part_categories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "part_requests" (
    "id" TEXT NOT NULL,
    "part_id" TEXT NOT NULL,
    "requested_by_id" TEXT NOT NULL,
    "requested_for_employee_id" TEXT,
    "handled_by_id" TEXT,
    "quantity" INTEGER NOT NULL,
    "approved_quantity" INTEGER,
    "status" "RequestStatus" NOT NULL DEFAULT 'PENDING',
    "is_rejected" BOOLEAN,
    "rejection_reason" TEXT,
    "requestedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "approved_at" TIMESTAMP(3),
    "delivered_at" TIMESTAMP(3),
    "work_order_id" TEXT,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "part_requests_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tires" (
    "id" TEXT NOT NULL,
    "brand" TEXT NOT NULL,
    "serial_number" TEXT NOT NULL,
    "axle_id" TEXT,
    "status" "TireCondition" NOT NULL DEFAULT 'NOVO',
    "tread_depth" INTEGER,
    "tread_pattern" TEXT,
    "wear_rating" INTEGER,
    "fire_number" TEXT,
    "location" "TireLocation" NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "tires_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TireRequest" (
    "id" TEXT NOT NULL,
    "tire_id" TEXT,
    "requested_by_id" TEXT NOT NULL,
    "requested_for_employee_id" TEXT,
    "handled_by_id" TEXT,
    "quantity" INTEGER NOT NULL,
    "approved_quantity" INTEGER,
    "status" "RequestStatus" NOT NULL DEFAULT 'PENDING',
    "rejection_reason" TEXT,
    "requested_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "approved_at" TIMESTAMP(3),
    "delivered_at" TIMESTAMP(3),
    "work_order_id" TEXT,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TireRequest_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "axle_history" (
    "id" TEXT NOT NULL,
    "axle_id" TEXT NOT NULL,
    "work_order_id" TEXT NOT NULL,
    "description" TEXT,
    "perfomed_at" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "axle_history_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tire_history" (
    "id" TEXT NOT NULL,
    "tire_id" TEXT NOT NULL,
    "work_order_id" TEXT NOT NULL,
    "description" TEXT,
    "perfomed_at" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "tire_history_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "employees" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "work_shift" TEXT NOT NULL,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "job_title_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "employees_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "job_titles" (
    "id" TEXT NOT NULL,
    "job_title" TEXT NOT NULL,

    CONSTRAINT "job_titles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "services" (
    "id" TEXT NOT NULL,
    "service_name" TEXT NOT NULL,
    "service_category" "ServiceCategory" NOT NULL,

    CONSTRAINT "services_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "work_orders" (
    "id" TEXT NOT NULL,
    "display_id" TEXT,
    "severity_level" TEXT NOT NULL,
    "entry_queue" TIMESTAMP(3),
    "entry_maintenance" TIMESTAMP(3),
    "exit_maintenance" TIMESTAMP(3),
    "start_waiting_parts" TIMESTAMP(3),
    "end_waiting_parts" TIMESTAMP(3),
    "queue_duration" INTEGER,
    "maintenance_duration" INTEGER,
    "waiting_parts_duration" INTEGER,
    "exit_supervisor" TEXT,
    "status" "MaintenanceStatus" NOT NULL,
    "fleet_id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "company_id" TEXT NOT NULL,
    "typeOfMaintenance" "TypeOfMaintenance" NOT NULL,
    "box_id" TEXT,
    "is_cancelled" BOOLEAN NOT NULL DEFAULT false,
    "created_by" TEXT,
    "updated_by" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "work_orders_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "service_assignments" (
    "id" TEXT NOT NULL,
    "word_order_id" TEXT NOT NULL,
    "service_id" TEXT NOT NULL,
    "employee_id" TEXT NOT NULL,
    "start_at" TIMESTAMP(3),
    "end_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "service_assignments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "checklist_templates" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "company_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "checklist_templates_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "checklist_item_templates" (
    "id" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "template_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "checklist_item_templates_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "checklists" (
    "id" TEXT NOT NULL,
    "work_order_id" TEXT NOT NULL,
    "template_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "checklists_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "checklist_items" (
    "id" TEXT NOT NULL,
    "checklist_id" TEXT NOT NULL,
    "item_template_id" TEXT NOT NULL,
    "is_conform" BOOLEAN NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "checklist_items_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "boxes" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "is_active" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "boxes_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "companies_id_key" ON "companies"("id");

-- CreateIndex
CREATE UNIQUE INDEX "companies_name_key" ON "companies"("name");

-- CreateIndex
CREATE UNIQUE INDEX "companies_cnpj_key" ON "companies"("cnpj");

-- CreateIndex
CREATE UNIQUE INDEX "companies_email_key" ON "companies"("email");

-- CreateIndex
CREATE INDEX "companies_name_idx" ON "companies"("name");

-- CreateIndex
CREATE INDEX "companies_email_idx" ON "companies"("email");

-- CreateIndex
CREATE INDEX "companies_cnpj_idx" ON "companies"("cnpj");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE INDEX "users_email_idx" ON "users"("email");

-- CreateIndex
CREATE INDEX "memberships_companyId_idx" ON "memberships"("companyId");

-- CreateIndex
CREATE INDEX "memberships_userId_idx" ON "memberships"("userId");

-- CreateIndex
CREATE INDEX "notes_user_id_idx" ON "notes"("user_id");

-- CreateIndex
CREATE INDEX "notes_work_order_id_idx" ON "notes"("work_order_id");

-- CreateIndex
CREATE UNIQUE INDEX "carries_carrier_name_key" ON "carries"("carrier_name");

-- CreateIndex
CREATE INDEX "carries_company_id_idx" ON "carries"("company_id");

-- CreateIndex
CREATE UNIQUE INDEX "vehicles_plate_key" ON "vehicles"("plate");

-- CreateIndex
CREATE INDEX "vehicles_company_id_idx" ON "vehicles"("company_id");

-- CreateIndex
CREATE INDEX "vehicles_plate_idx" ON "vehicles"("plate");

-- CreateIndex
CREATE UNIQUE INDEX "fleets_fleet_number_key" ON "fleets"("fleet_number");

-- CreateIndex
CREATE INDEX "fleets_carrier_id_idx" ON "fleets"("carrier_id");

-- CreateIndex
CREATE INDEX "fleets_company_id_idx" ON "fleets"("company_id");

-- CreateIndex
CREATE UNIQUE INDEX "trailers_plate_key" ON "trailers"("plate");

-- CreateIndex
CREATE INDEX "trailers_fleet_id_idx" ON "trailers"("fleet_id");

-- CreateIndex
CREATE INDEX "axles_trailer_id_idx" ON "axles"("trailer_id");

-- CreateIndex
CREATE UNIQUE INDEX "parts_part_number_key" ON "parts"("part_number");

-- CreateIndex
CREATE UNIQUE INDEX "parts_serial_number_key" ON "parts"("serial_number");

-- CreateIndex
CREATE INDEX "parts_trailer_id_idx" ON "parts"("trailer_id");

-- CreateIndex
CREATE INDEX "parts_category_id_idx" ON "parts"("category_id");

-- CreateIndex
CREATE UNIQUE INDEX "part_categories_name_key" ON "part_categories"("name");

-- CreateIndex
CREATE INDEX "part_categories_name_idx" ON "part_categories"("name");

-- CreateIndex
CREATE UNIQUE INDEX "tires_serial_number_key" ON "tires"("serial_number");

-- CreateIndex
CREATE UNIQUE INDEX "tires_fire_number_key" ON "tires"("fire_number");

-- CreateIndex
CREATE INDEX "tires_axle_id_idx" ON "tires"("axle_id");

-- CreateIndex
CREATE INDEX "axle_history_axle_id_idx" ON "axle_history"("axle_id");

-- CreateIndex
CREATE INDEX "axle_history_work_order_id_idx" ON "axle_history"("work_order_id");

-- CreateIndex
CREATE UNIQUE INDEX "employees_name_key" ON "employees"("name");

-- CreateIndex
CREATE INDEX "employees_job_title_id_idx" ON "employees"("job_title_id");

-- CreateIndex
CREATE UNIQUE INDEX "job_titles_job_title_key" ON "job_titles"("job_title");

-- CreateIndex
CREATE INDEX "job_titles_job_title_idx" ON "job_titles"("job_title");

-- CreateIndex
CREATE UNIQUE INDEX "services_service_name_key" ON "services"("service_name");

-- CreateIndex
CREATE UNIQUE INDEX "work_orders_display_id_key" ON "work_orders"("display_id");

-- CreateIndex
CREATE INDEX "work_orders_fleet_id_idx" ON "work_orders"("fleet_id");

-- CreateIndex
CREATE INDEX "work_orders_user_id_idx" ON "work_orders"("user_id");

-- CreateIndex
CREATE INDEX "work_orders_company_id_idx" ON "work_orders"("company_id");

-- CreateIndex
CREATE INDEX "service_assignments_word_order_id_idx" ON "service_assignments"("word_order_id");

-- CreateIndex
CREATE INDEX "service_assignments_employee_id_idx" ON "service_assignments"("employee_id");

-- CreateIndex
CREATE INDEX "service_assignments_service_id_idx" ON "service_assignments"("service_id");

-- CreateIndex
CREATE INDEX "checklist_templates_company_id_idx" ON "checklist_templates"("company_id");

-- CreateIndex
CREATE INDEX "checklists_work_order_id_idx" ON "checklists"("work_order_id");

-- CreateIndex
CREATE INDEX "checklists_template_id_idx" ON "checklists"("template_id");

-- CreateIndex
CREATE INDEX "checklist_items_checklist_id_idx" ON "checklist_items"("checklist_id");

-- CreateIndex
CREATE UNIQUE INDEX "boxes_name_key" ON "boxes"("name");

-- AddForeignKey
ALTER TABLE "memberships" ADD CONSTRAINT "memberships_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "companies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "memberships" ADD CONSTRAINT "memberships_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "notes" ADD CONSTRAINT "notes_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "notes" ADD CONSTRAINT "notes_work_order_id_fkey" FOREIGN KEY ("work_order_id") REFERENCES "work_orders"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "carries" ADD CONSTRAINT "carries_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "companies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "vehicles" ADD CONSTRAINT "vehicles_fleet_id_fkey" FOREIGN KEY ("fleet_id") REFERENCES "fleets"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "vehicles" ADD CONSTRAINT "vehicles_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "companies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "fleets" ADD CONSTRAINT "fleets_carrier_id_fkey" FOREIGN KEY ("carrier_id") REFERENCES "carries"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "fleets" ADD CONSTRAINT "fleets_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "companies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "trailers" ADD CONSTRAINT "trailers_fleet_id_fkey" FOREIGN KEY ("fleet_id") REFERENCES "fleets"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "trailers" ADD CONSTRAINT "trailers_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "companies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "axles" ADD CONSTRAINT "axles_trailer_id_fkey" FOREIGN KEY ("trailer_id") REFERENCES "trailers"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "parts" ADD CONSTRAINT "parts_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "part_categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "parts" ADD CONSTRAINT "parts_trailer_id_fkey" FOREIGN KEY ("trailer_id") REFERENCES "trailers"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "parts" ADD CONSTRAINT "parts_axle_id_fkey" FOREIGN KEY ("axle_id") REFERENCES "axles"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "parts" ADD CONSTRAINT "parts_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "companies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "part_requests" ADD CONSTRAINT "part_requests_part_id_fkey" FOREIGN KEY ("part_id") REFERENCES "parts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "part_requests" ADD CONSTRAINT "part_requests_requested_by_id_fkey" FOREIGN KEY ("requested_by_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "part_requests" ADD CONSTRAINT "part_requests_requested_for_employee_id_fkey" FOREIGN KEY ("requested_for_employee_id") REFERENCES "employees"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "part_requests" ADD CONSTRAINT "part_requests_handled_by_id_fkey" FOREIGN KEY ("handled_by_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "part_requests" ADD CONSTRAINT "part_requests_work_order_id_fkey" FOREIGN KEY ("work_order_id") REFERENCES "work_orders"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tires" ADD CONSTRAINT "tires_axle_id_fkey" FOREIGN KEY ("axle_id") REFERENCES "axles"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TireRequest" ADD CONSTRAINT "TireRequest_tire_id_fkey" FOREIGN KEY ("tire_id") REFERENCES "tires"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TireRequest" ADD CONSTRAINT "TireRequest_requested_by_id_fkey" FOREIGN KEY ("requested_by_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TireRequest" ADD CONSTRAINT "TireRequest_requested_for_employee_id_fkey" FOREIGN KEY ("requested_for_employee_id") REFERENCES "employees"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TireRequest" ADD CONSTRAINT "TireRequest_handled_by_id_fkey" FOREIGN KEY ("handled_by_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TireRequest" ADD CONSTRAINT "TireRequest_work_order_id_fkey" FOREIGN KEY ("work_order_id") REFERENCES "work_orders"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "axle_history" ADD CONSTRAINT "axle_history_axle_id_fkey" FOREIGN KEY ("axle_id") REFERENCES "axles"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "axle_history" ADD CONSTRAINT "axle_history_work_order_id_fkey" FOREIGN KEY ("work_order_id") REFERENCES "work_orders"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tire_history" ADD CONSTRAINT "tire_history_tire_id_fkey" FOREIGN KEY ("tire_id") REFERENCES "tires"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tire_history" ADD CONSTRAINT "tire_history_work_order_id_fkey" FOREIGN KEY ("work_order_id") REFERENCES "work_orders"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "employees" ADD CONSTRAINT "employees_job_title_id_fkey" FOREIGN KEY ("job_title_id") REFERENCES "job_titles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "work_orders" ADD CONSTRAINT "work_orders_fleet_id_fkey" FOREIGN KEY ("fleet_id") REFERENCES "fleets"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "work_orders" ADD CONSTRAINT "work_orders_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "work_orders" ADD CONSTRAINT "work_orders_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "companies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "work_orders" ADD CONSTRAINT "work_orders_box_id_fkey" FOREIGN KEY ("box_id") REFERENCES "boxes"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "service_assignments" ADD CONSTRAINT "service_assignments_word_order_id_fkey" FOREIGN KEY ("word_order_id") REFERENCES "work_orders"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "service_assignments" ADD CONSTRAINT "service_assignments_service_id_fkey" FOREIGN KEY ("service_id") REFERENCES "services"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "service_assignments" ADD CONSTRAINT "service_assignments_employee_id_fkey" FOREIGN KEY ("employee_id") REFERENCES "employees"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "checklist_templates" ADD CONSTRAINT "checklist_templates_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "companies"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "checklist_item_templates" ADD CONSTRAINT "checklist_item_templates_template_id_fkey" FOREIGN KEY ("template_id") REFERENCES "checklist_templates"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "checklists" ADD CONSTRAINT "checklists_work_order_id_fkey" FOREIGN KEY ("work_order_id") REFERENCES "work_orders"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "checklists" ADD CONSTRAINT "checklists_template_id_fkey" FOREIGN KEY ("template_id") REFERENCES "checklist_templates"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "checklist_items" ADD CONSTRAINT "checklist_items_checklist_id_fkey" FOREIGN KEY ("checklist_id") REFERENCES "checklists"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "checklist_items" ADD CONSTRAINT "checklist_items_item_template_id_fkey" FOREIGN KEY ("item_template_id") REFERENCES "checklist_item_templates"("id") ON DELETE CASCADE ON UPDATE CASCADE;
