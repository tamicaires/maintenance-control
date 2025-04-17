import { Module } from "@nestjs/common";
import { CheckUserMembership } from "src/application/membership/useCases/checkUserMembership";
import { DatabaseModule } from "src/infra/database/database.module";
import { AbilityController } from "./ability.controller";
import { GetUserPermissions } from "src/application/permissions/useCase/getUserPermissions";

@Module({
  controllers: [AbilityController],
  imports: [
    DatabaseModule
  ],
  providers: [
    CheckUserMembership,
    GetUserPermissions
  ],
})

export class AbilityModule { }