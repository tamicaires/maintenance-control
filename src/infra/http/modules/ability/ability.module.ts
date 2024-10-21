import { Module } from "@nestjs/common";
import { CheckUserMembership } from "src/modules/memberShip/useCases/checkUserMembership";
import { CompanyModule } from "../company/company.module";
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