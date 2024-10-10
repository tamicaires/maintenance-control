import { Module } from "@nestjs/common";
import { DatabaseModule } from "src/infra/database/database.module";
import { RoleAssignmentController } from "./roleAssignment.controller";
import { CreateManyRoleAssignment } from "src/modules/roleAssignment/useCases/createRoleAssigment";

@Module({
  imports: [DatabaseModule],
  controllers: [RoleAssignmentController],
  providers: [CreateManyRoleAssignment]
})

export class RoleAssignmentModule {}