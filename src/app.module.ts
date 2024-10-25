import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { DatabaseModule } from './infra/database/database.module';
import { AxleModule } from './presenters/axle/axle.module';
import { CarrierModule } from './presenters/carrier/carrier.module';
import { CompanyModule } from './presenters/company/company.module';
import { EmployeeModule } from './presenters/employee/employee.module';
import { FleetModule } from './presenters/fleet/fleet.module';
import { JobModule } from './presenters/job/job.module';
import { MembershipModule } from './presenters/membership/membership.module';
import { NoteModule } from './presenters/note/note.module';
import { PartModule } from './presenters/part/part.module';
import { PartCategoryModule } from './presenters/partCategory/partCategory.module';
import { ServiceModule } from './presenters/service/service.module';
import { ServiceAssignmentModule } from './presenters/serviceAssignment/serviceAssignment.module';
import { TireModule } from './presenters/tire/tire.module';
import { TrailerModule } from './presenters/trailer/trailer.module';
import { UserModule } from './presenters/user/user.module';
import { WorkOrderModule } from './presenters/workOrder/workOrder.module';
import { AuthModule } from './infra/http/auth/auth.module';
import { AbilityModule } from './infra/http/ability/ability.module';
import { JwtAuthGuard } from './infra/http/auth/guards/jwtAuth.guard';
import { VehicleModule } from './presenters/vehicle/vehicle.module';

@Module({
  imports: [
    DatabaseModule,
    AuthModule,
    AbilityModule,
    CompanyModule,
    MembershipModule,
    UserModule,
    NoteModule,
    VehicleModule,
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
