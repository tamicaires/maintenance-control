import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { DatabaseModule } from './infra/database/database.module';
import { AxleModule } from './application/axle/axle.module';
import { CarrierModule } from './application/carrier/carrier.module';
import { CompanyModule } from './application/company/company.module';
import { EmployeeModule } from './application/employee/employee.module';
import { FleetModule } from './application/fleet/fleet.module';
import { JobModule } from './application/job/job.module';
import { MembershipModule } from './application/membership/membership.module';
import { NoteModule } from './application/note/note.module';
import { PartModule } from './application/part/part.module';
import { PartCategoryModule } from './application/partCategory/partCategory.module';
import { ServiceModule } from './application/service/service.module';
import { ServiceAssignmentModule } from './application/serviceAssignment/serviceAssignment.module';
import { TireModule } from './application/tire/tire.module';
import { TrailerModule } from './application/trailer/trailer.module';
import { UserModule } from './application/user/user.module';
import { WorkOrderModule } from './application/workOrder/workOrder.module';
import { AuthModule } from './infra/http/auth/auth.module';
import { AbilityModule } from './infra/http/ability/ability.module';
import { JwtAuthGuard } from './infra/http/auth/guards/jwtAuth.guard';

@Module({
  imports: [
    DatabaseModule,
    AuthModule,
    AbilityModule,
    CompanyModule,
    MembershipModule,
    UserModule,
    NoteModule,
    CarrierModule,
    FleetModule,
    TrailerModule,
    AxleModule,
    PartCategoryModule,
    PartModule,
    TireModule,
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
export class AppModule { }
