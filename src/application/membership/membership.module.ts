import { Module } from "@nestjs/common";
import { MembershipController } from "./membership.controller";
import { DatabaseModule } from "src/infra/database/database.module";
import { UserModule } from "../user/user.module";
import { CompanyModule } from "../company/company.module";
import { CheckUserMembership } from "src/domain/memberShip/useCases/checkUserMembership";
import { GetCurrentMembership } from "src/domain/memberShip/useCases/getCurrentMembership";
import { GetMembershipByUser } from "src/domain/memberShip/useCases/getMembershipByUser";
import { SetCurrentMembership } from "src/domain/memberShip/useCases/setCurrentMembership";
import { CreateMembership } from "src/domain/memberShip/useCases/createMembership";

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