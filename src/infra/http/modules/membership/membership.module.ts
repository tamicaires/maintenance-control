import { Module } from "@nestjs/common";
import { MembershipController } from "./membership.controller";
import { DatabaseModule } from "src/infra/database/database.module";
import { CreateMembership } from "src/modules/memberShip/useCases/createMembership";
import { SetCurrentMembership } from "src/modules/memberShip/useCases/setCurrentMembership";
import { GetCurrentMembership } from "src/modules/memberShip/useCases/getCurrentMembership";
import { GetMembershipByUser } from "src/modules/memberShip/useCases/getMembershipByUser";
import { CheckUserMembership } from "src/modules/memberShip/useCases/checkUserMembership";
import { UserModule } from "../user/user.module";
import { CompanyModule } from "../company/company.module";

@Module({
  controllers: [MembershipController],
  imports: [DatabaseModule, UserModule, CompanyModule],
  providers: [
    CreateMembership,
    SetCurrentMembership,
    GetCurrentMembership,
    GetMembershipByUser,
    CheckUserMembership
  ]
})

export class MembershipModule {}