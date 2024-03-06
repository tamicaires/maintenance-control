import { Module } from "@nestjs/common";
import { ServiceAssignmentController } from "./serviceAssignment.controller";
import { DatabaseModule } from "src/infra/database/database.module";
import { CreateServiceAssignment } from "src/modules/serviceAssignment/useCases/createServiceAssignment/createServiceAssignment";
import { UpdateServiceAssignment } from "src/modules/serviceAssignment/useCases/updateServiceAssignment/updateServiceAssignment";
import { DeleteServiceAssignment } from "src/modules/serviceAssignment/useCases/deleteServiceAssignment/deleteServiceAssignment";
import { GetServiceAssignment } from "src/modules/serviceAssignment/useCases/getServiceAssignment/getServiceAssignment";
import { GetManyServiceAssignments } from "src/modules/serviceAssignment/useCases/getManyServiceAssignments/getManyServiceAssignments";

@Module({
  controllers: [ServiceAssignmentController],
  imports: [DatabaseModule],
  providers: [
    CreateServiceAssignment,
    UpdateServiceAssignment,
    DeleteServiceAssignment,
    GetServiceAssignment,
    GetManyServiceAssignments
  ]
})

export class ServiceAssignmentModule {}