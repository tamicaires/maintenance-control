import { Module } from "@nestjs/common";
import { DatabaseModule } from "src/infra/database/database.module";
import { RoleController } from "./role.controller";
import { CreateRole } from "src/modules/role/useCase/createRole";
import { GetManyRoles } from "src/modules/role/useCase/getManyRoles";

@Module({
  imports: [DatabaseModule],
  controllers: [RoleController],
  providers: [CreateRole, GetManyRoles],
})

export class RoleModule { }