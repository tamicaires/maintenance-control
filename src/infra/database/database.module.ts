import { Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { UserRepository } from 'src/modules/user/repositories/UserRepository';
import { PrismaUserRepository } from './prisma/repositories/PrismaUserRepository';
import { FleetRepository } from 'src/modules/fleet/repositories/FleetRepository';
import { PrismaFleetRepository } from './prisma/repositories/PrismaFleetRepository';
import { NoteRepository } from 'src/modules/note/repositories/noteRepository';
import { PrismaNoteRepository } from './prisma/repositories/PrismaNoteRepository';
import { CarrierRepository } from 'src/modules/carrier/repositories/CarrierRepository';
import { PrismaCarrierRepository } from './prisma/repositories/PrismaCarrierRepository';
import { JobRepository } from 'src/modules/job/repositories/jobRepository';
import { PrismaJobRepository } from './prisma/repositories/PrismaJobRepository';
import { EmployeeRepository } from 'src/modules/employee/repositories/EmployeeRepository';
import { PrismaEmployeeRepository } from './prisma/repositories/PrismaEmployeeRepository';
import { ServiceRepository } from 'src/modules/service/repositories/serviceRepository';
import { PrismaServiceRepository } from './prisma/repositories/PrismaServiceRepository';
import { WorkOrderRepository } from 'src/modules/workOrder/repositories/workOrderRepository';
import { PrismaWorkOrderRepository } from './prisma/repositories/PrismaWorkOrderRepository';
import { ServiceAssignmentRepository } from 'src/modules/serviceAssignment/repositories/serviceAssignmentRepository';
import { PrismaServiceAssignmentsRepository } from './prisma/repositories/PrismaServiceAssignmentsRepository';
import { CompanyRepository } from 'src/modules/company/repositories/CompanyRepository';
import { PrismaCompanyRepository } from './prisma/repositories/PrismaCompanyRepository';
import { MembershipRepository } from 'src/modules/memberShip/repositories/membershipRepository';
import { PrismaMembershipRepository } from './prisma/repositories/PrismaMembershipRepository';
import { TrailerRepository } from 'src/modules/trailer/repositories/trailerRepository';
import { PrismaTrailerRepository } from './prisma/repositories/PrismaTrailerRepository';
import { AxleRepository } from 'src/modules/axle/repositories/axleRepository';
import { PrismaAxleRepository } from './prisma/repositories/PrismaAxleRepository';
import { PartCategoryRepository } from 'src/modules/partCategory/repositories/partCategoryRepository';
import { PrismaPartCategoryRepository } from './prisma/repositories/PrismaPartCategoryRepository';
import { PartRepository } from 'src/modules/part/repositories/partRepository';
import { PrismaPartRepository } from './prisma/repositories/PrismaPartRepository';

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
    JobRepository,
    EmployeeRepository,
    ServiceRepository,
    WorkOrderRepository,
    ServiceAssignmentRepository,
  ],
})
export class DatabaseModule { }
