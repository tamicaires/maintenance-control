import { Module } from '@nestjs/common';
import { ServiceAssignmentController } from './serviceAssignment.controller';
import { DatabaseModule } from 'src/infra/database/database.module';
import { CreateServiceAssignment } from 'src/application/service-assignment/useCases/createServiceAssignment/createServiceAssignment';
import { DeleteServiceAssignment } from 'src/application/service-assignment/useCases/deleteServiceAssignment/deleteServiceAssignment';
import { GetManyServiceAssignments } from 'src/application/service-assignment/useCases/getManyServiceAssignments/getManyServiceAssignments';
import { GetServiceAssignment } from 'src/application/service-assignment/useCases/getServiceAssignment/getServiceAssignment';
import { UpdateServiceAssignment } from 'src/application/service-assignment/useCases/updateServiceAssignment/updateServiceAssignment';

@Module({
  controllers: [ServiceAssignmentController],
  imports: [DatabaseModule],
  providers: [
    CreateServiceAssignment,
    UpdateServiceAssignment,
    DeleteServiceAssignment,
    GetServiceAssignment,
    GetManyServiceAssignments,
  ],
})
export class ServiceAssignmentModule {}
