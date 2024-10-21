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
import { MembershipModule } from './infra/http/modules/membership/membership.module';
import { TrailerModule } from './infra/http/modules/trailer/trailer.module';
import { AxleModule } from './infra/http/modules/axle/axle.module';
import { PartCategoryModule } from './infra/http/modules/partCategory/partCategory.module';
import { PartModule } from './infra/http/modules/part/part.module';
import { TireModule } from './infra/http/modules/tire/tire.module';
import { CheckUserMembership } from './modules/memberShip/useCases/checkUserMembership';
import { AbilityModule } from './infra/http/modules/ability/ability.module';

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
