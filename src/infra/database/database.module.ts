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
import { RoleRepository } from 'src/modules/role/repositories/roleRepository';
import { PrismaRoleRepository } from './prisma/repositories/PrismaRoleRepository';
import { RoleAssignmentRepository } from 'src/modules/roleAssignment/repositories/RoleAssignmentRepository';
import { PrismaRoleAssigmentRepository } from './prisma/repositories/PrismaRoleAssignment';

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
      provide: RoleRepository,
      useClass: PrismaRoleRepository,
    },
    {
      provide: RoleAssignmentRepository,
      useClass: PrismaRoleAssigmentRepository,
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
    RoleRepository,
    RoleAssignmentRepository,
    NoteRepository,
    CarrierRepository,
    FleetRepository,
    JobRepository,
    EmployeeRepository,
    ServiceRepository,
    WorkOrderRepository,
    ServiceAssignmentRepository,
  ],
})
export class DatabaseModule {}
