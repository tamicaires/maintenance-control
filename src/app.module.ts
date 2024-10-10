import { Module } from '@nestjs/common';
import { UserModule } from './infra/http/modules/user/user.module';
import { DatabaseModule } from './infra/database/database.module';
import { FleetModule } from './infra/http/modules/fleet/fleet.module';
import { AuthModule } from './infra/http/modules/auth/auth.module';
import { JwtAuthGuard } from './infra/http/modules/auth/guards/jwtAuth.guard';
import { APP_GUARD } from '@nestjs/core';
import { NoteModule } from './infra/http/modules/note/note.module';
import { CarrierModule } from './infra/http/modules/carrier/carrier.module';
import { JobModule } from './infra/http/modules/job/job.module';
import { EmployeeModule } from './infra/http/modules/employee/employee.module';
import { ServiceModule } from './infra/http/modules/service/service.module';
import { WorkOrderModule } from './infra/http/modules/workOrder/workOrder.module';
import { ServiceAssignmentModule } from './infra/http/modules/serviceAssignment/serviceAssignment.module';
import { CompanyModule } from './infra/http/modules/company/company.module';
import { AbilityModule } from './infra/http/modules/ability/ability.module';
import { RoleModule } from './infra/http/modules/role/role.module';
import { RoleAssignmentModule } from './infra/http/modules/roleAssignment/roleAssignment.module';

@Module({
  imports: [
    AbilityModule,
    DatabaseModule,
    AuthModule,
    CompanyModule,
    RoleModule,
    RoleAssignmentModule,
    UserModule,
    NoteModule,
    CarrierModule,
    FleetModule,
    JobModule,
    EmployeeModule,
    ServiceModule,
    WorkOrderModule,
    ServiceAssignmentModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
