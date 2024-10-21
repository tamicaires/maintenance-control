import { Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';

import { PrismaUserRepository } from './prisma/repositories/PrismaUserRepository';
import { FleetRepository } from 'src/domain/fleet/repositories/FleetRepository';
import { PrismaFleetRepository } from './prisma/repositories/PrismaFleetRepository';
import { NoteRepository } from 'src/domain/note/repositories/noteRepository';
import { PrismaNoteRepository } from './prisma/repositories/PrismaNoteRepository';
import { CarrierRepository } from 'src/domain/carrier/repositories/CarrierRepository';
import { PrismaCarrierRepository } from './prisma/repositories/PrismaCarrierRepository';
import { JobRepository } from 'src/domain/job/repositories/jobRepository';
import { PrismaJobRepository } from './prisma/repositories/PrismaJobRepository';
import { EmployeeRepository } from 'src/domain/employee/repositories/EmployeeRepository';
import { PrismaEmployeeRepository } from './prisma/repositories/PrismaEmployeeRepository';
import { ServiceRepository } from 'src/domain/service/repositories/serviceRepository';
import { PrismaServiceRepository } from './prisma/repositories/PrismaServiceRepository';
import { WorkOrderRepository } from 'src/domain/workOrder/repositories/workOrderRepository';
import { PrismaWorkOrderRepository } from './prisma/repositories/PrismaWorkOrderRepository';
import { ServiceAssignmentRepository } from 'src/domain/serviceAssignment/repositories/serviceAssignmentRepository';
import { PrismaServiceAssignmentsRepository } from './prisma/repositories/PrismaServiceAssignmentsRepository';
import { CompanyRepository } from 'src/domain/company/repositories/CompanyRepository';
import { PrismaCompanyRepository } from './prisma/repositories/PrismaCompanyRepository';
import { MembershipRepository } from 'src/domain/memberShip/repositories/membershipRepository';
import { PrismaMembershipRepository } from './prisma/repositories/PrismaMembershipRepository';
import { TrailerRepository } from 'src/domain/trailer/repositories/trailerRepository';
import { PrismaTrailerRepository } from './prisma/repositories/PrismaTrailerRepository';
import { AxleRepository } from 'src/domain/axle/repositories/axleRepository';
import { PrismaAxleRepository } from './prisma/repositories/PrismaAxleRepository';
import { PartCategoryRepository } from 'src/domain/partCategory/repositories/partCategoryRepository';
import { PrismaPartCategoryRepository } from './prisma/repositories/PrismaPartCategoryRepository';
import { PartRepository } from 'src/domain/part/repositories/partRepository';
import { PrismaPartRepository } from './prisma/repositories/PrismaPartRepository';
import { TireRepository } from 'src/domain/tire/repositories/TireRepository';
import { PrismaTireRepository } from './prisma/repositories/PrismaTireRepository';
import { UserRepository } from 'src/domain/user/repositories/UserRepository';

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
  ],
  exports: [
    CompanyRepository,
    UserRepository,
    MembershipRepository,
    NoteRepository,
    CarrierRepository,
    FleetRepository,
    TrailerRepository,
    AxleRepository,
    PartCategoryRepository,
    PartRepository,
    TireRepository,
    JobRepository,
    EmployeeRepository,
    ServiceRepository,
    WorkOrderRepository,
    ServiceAssignmentRepository,
  ],
})
export class DatabaseModule { }
