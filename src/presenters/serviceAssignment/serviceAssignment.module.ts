import { Module } from '@nestjs/common';
import { ServiceAssignmentController } from './serviceAssignment.controller';
import { DatabaseModule } from 'src/infra/database/database.module';
import { CreateServiceAssignment } from 'src/application/service-assignment/useCases/createServiceAssignment/createServiceAssignment';
import { DeleteServiceAssignment } from 'src/application/service-assignment/useCases/deleteServiceAssignment/deleteServiceAssignment';
import { GetManyServiceAssignments } from 'src/application/service-assignment/useCases/getManyServiceAssignments/getManyServiceAssignments';
import { GetServiceAssignment } from 'src/application/service-assignment/useCases/getServiceAssignment/getServiceAssignment';
import { UpdateServiceAssignment } from 'src/application/service-assignment/useCases/updateServiceAssignment/updateServiceAssignment';
import { GetServiceAssigmentByWorkOrder } from 'src/application/service-assignment/useCases/getServiceAssignmentByWorkOrder';
import { ChangeStatus } from 'src/application/service-assignment/useCases/change-status';
import { DeleteAllAssigments } from 'src/application/service-assignment/useCases/delete-all-assigments/delete-all-assingments';

@Module({
  controllers: [ServiceAssignmentController],
  imports: [DatabaseModule],
  providers: [
    CreateServiceAssignment,
    UpdateServiceAssignment,
    DeleteServiceAssignment,
    GetServiceAssignment,
    GetManyServiceAssignments,
    GetServiceAssigmentByWorkOrder,
    ChangeStatus,
    DeleteAllAssigments
  ],
})
export class ServiceAssignmentModule { }
