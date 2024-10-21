import { Module } from "@nestjs/common";
import { CheckUserMembership } from "src/domain/memberShip/useCases/checkUserMembership";
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