import { Module } from "@nestjs/common";
import { MembershipController } from "./membership.controller";
import { DatabaseModule } from "src/infra/database/database.module";
import { UserModule } from "../user/user.module";
import { CompanyModule } from "../company/company.module";
import { CheckUserMembership } from "src/application/membership/useCases/checkUserMembership";
import { GetCurrentMembership } from "src/application/membership/useCases/getCurrentMembership";
import { GetMembershipByUser } from "src/application/membership/useCases/getMembershipByUser";
import { SetCurrentMembership } from "src/application/membership/useCases/setCurrentMembership";
import { CreateMembership } from "src/application/membership/useCases/createMembership";

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