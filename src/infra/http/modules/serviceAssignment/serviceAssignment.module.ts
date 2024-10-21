import { Module } from '@nestjs/common';
import { ServiceAssignmentController } from './serviceAssignment.controller';
import { DatabaseModule } from 'src/infra/database/database.module';
import { CreateServiceAssignment } from 'src/domain/serviceAssignment/useCases/createServiceAssignment/createServiceAssignment';
import { DeleteServiceAssignment } from 'src/domain/serviceAssignment/useCases/deleteServiceAssignment/deleteServiceAssignment';
import { GetManyServiceAssignments } from 'src/domain/serviceAssignment/useCases/getManyServiceAssignments/getManyServiceAssignments';
import { GetServiceAssignment } from 'src/domain/serviceAssignment/useCases/getServiceAssignment/getServiceAssignment';
import { UpdateServiceAssignment } from 'src/domain/serviceAssignment/useCases/updateServiceAssignment/updateServiceAssignment';


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
