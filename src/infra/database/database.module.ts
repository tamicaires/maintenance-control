import { Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { PrismaUserRepository } from './prisma/repositories/PrismaUserRepository';
import { PrismaFleetRepository } from './prisma/repositories/PrismaFleetRepository';
import { PrismaNoteRepository } from './prisma/repositories/PrismaNoteRepository';
import { PrismaCarrierRepository } from './prisma/repositories/PrismaCarrierRepository';
import { PrismaJobRepository } from './prisma/repositories/PrismaJobRepository';
import { PrismaEmployeeRepository } from './prisma/repositories/PrismaEmployeeRepository';
import { PrismaServiceRepository } from './prisma/repositories/PrismaServiceRepository';
import { PrismaWorkOrderRepository } from './prisma/repositories/PrismaWorkOrderRepository';
import { PrismaServiceAssignmentsRepository } from './prisma/repositories/PrismaServiceAssignmentsRepository';
import { PrismaCompanyRepository } from './prisma/repositories/PrismaCompanyRepository';
import { PrismaMembershipRepository } from './prisma/repositories/PrismaMembershipRepository';
import { PrismaTrailerRepository } from './prisma/repositories/PrismaTrailerRepository';
import { PrismaAxleRepository } from './prisma/repositories/PrismaAxleRepository';
import { PrismaPartCategoryRepository } from './prisma/repositories/PrismaPartCategoryRepository';
import { PrismaPartRepository } from './prisma/repositories/PrismaPartRepository';
import { PrismaTireRepository } from './prisma/repositories/PrismaTireRepository';
import { VehicleRepository } from 'src/core/domain/repositories/vechicle-repository';
import { PrismaVehicleRepository } from './prisma/repositories/PrismaVehicleRepository';
import { AxleRepository } from 'src/core/domain/repositories/axle-repository';
import { CarrierRepository } from 'src/core/domain/repositories/carrier-repository';
import { CompanyRepository } from 'src/core/domain/repositories/company-repository';
import { EmployeeRepository } from 'src/core/domain/repositories/employee-repository';
import { FleetRepository } from 'src/core/domain/repositories/fleet-repository';
import { JobRepository } from 'src/core/domain/repositories/job-repository';
import { MembershipRepository } from 'src/core/domain/repositories/membership-repository';
import { NoteRepository } from 'src/core/domain/repositories/note-repository';
import { PartCategoryRepository } from 'src/core/domain/repositories/part-category-repository';
import { PartRepository } from 'src/core/domain/repositories/part-repository';
import { ServiceAssignmentRepository } from 'src/core/domain/repositories/service-assignment-repository';
import { ServiceRepository } from 'src/core/domain/repositories/service-repository';
import { TireRepository } from 'src/core/domain/repositories/tire-repository';
import { TrailerRepository } from 'src/core/domain/repositories/trailer-repository';
import { UserRepository } from 'src/core/domain/repositories/user-repository';
import { WorkOrderRepository } from 'src/core/domain/repositories/work-order-repository';
import { BoxRepository } from 'src/core/domain/repositories/box-repository';
import { PrismaBoxRepository } from './prisma/repositories/prisma-box-repository';
import { PartRequestRepository } from 'src/core/domain/repositories/part-request-repository';
import { PrismaPartRequestRepository } from './prisma/repositories/prisma-part-request-repository';
import { PrismaEmployeeServiceAssigmentRepository } from './prisma/repositories/prisma-employee-service-assigment';
import { EmployeeServiceAssigmentRepository } from 'src/core/domain/repositories/employee-service-assigment-repository';
import { ChecklistCategoryRepository } from 'src/core/domain/repositories/checklist/checklist-category-repository';
import { PrismaChecklistCategoryRepository } from './prisma/repositories/prisma-checklist-category';
import { ChecklistTemplateRepository } from 'src/core/domain/repositories/checklist/checklist-template-repository';
import { PrismaChecklistTemplateRepository } from './prisma/repositories/prisma-checklist-template';

@Module({
  providers: [
    PrismaService,
    {
      provide: CompanyRepository,
      useClass: PrismaCompanyRepository,
    },
    {
      provide: UserRepository,
      useClass: PrismaUserRepository,
    },
    {
      provide: MembershipRepository,
      useClass: PrismaMembershipRepository,
    },
    {
      provide: NoteRepository,
      useClass: PrismaNoteRepository,
    },
    {
      provide: VehicleRepository,
      useClass: PrismaVehicleRepository,
    },
    {
      provide: CarrierRepository,
      useClass: PrismaCarrierRepository,
    },
    {
      provide: FleetRepository,
      useClass: PrismaFleetRepository,
    },
    {
      provide: TrailerRepository,
      useClass: PrismaTrailerRepository,
    },
    {
      provide: AxleRepository,
      useClass: PrismaAxleRepository,
    },
    {
      provide: PartCategoryRepository,
      useClass: PrismaPartCategoryRepository,
    },
    {
      provide: PartRepository,
      useClass: PrismaPartRepository,
    },
    {
      provide: PartRequestRepository,
      useClass: PrismaPartRequestRepository,
    },
    {
      provide: TireRepository,
      useClass: PrismaTireRepository,
    },
    {
      provide: JobRepository,
      useClass: PrismaJobRepository,
    },
    {
      provide: EmployeeRepository,
      useClass: PrismaEmployeeRepository,
    },
    {
      provide: ServiceRepository,
      useClass: PrismaServiceRepository,
    },
    {
      provide: WorkOrderRepository,
      useClass: PrismaWorkOrderRepository,
    },
    {
      provide: ServiceAssignmentRepository,
      useClass: PrismaServiceAssignmentsRepository,
    },
    {
      provide: EmployeeServiceAssigmentRepository,
      useClass: PrismaEmployeeServiceAssigmentRepository,
    },
    {
      provide: BoxRepository,
      useClass: PrismaBoxRepository,
    },
    {
      provide: ChecklistCategoryRepository,
      useClass: PrismaChecklistCategoryRepository,
    },
    {
      provide: ChecklistTemplateRepository,
      useClass: PrismaChecklistTemplateRepository,
    },
  ],
  exports: [
    CompanyRepository,
    UserRepository,
    MembershipRepository,
    NoteRepository,
    VehicleRepository,
    CarrierRepository,
    FleetRepository,
    TrailerRepository,
    AxleRepository,
    PartCategoryRepository,
    PartRepository,
    PartRequestRepository,
    TireRepository,
    JobRepository,
    EmployeeRepository,
    ServiceRepository,
    WorkOrderRepository,
    ServiceAssignmentRepository,
    EmployeeServiceAssigmentRepository,
    BoxRepository,
    ChecklistCategoryRepository,
    ChecklistTemplateRepository,
  ],
})
export class DatabaseModule { }
