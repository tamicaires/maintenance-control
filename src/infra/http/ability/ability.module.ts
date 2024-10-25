import { Module } from "@nestjs/common";
import { CheckUserMembership } from "src/application/membership/useCases/checkUserMembership";
import { DatabaseModule } from "src/infra/database/database.module";

@Module({
  imports: [
    DatabaseModule
  ],
  providers: [
    CheckUserMembership,
  ],
})

export class AbilityModule { }