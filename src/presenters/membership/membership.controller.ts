import { Body, Controller, Get, Param, Post, Request } from "@nestjs/common";
import { CreateMembershipBody } from "./dto/createMembershipBody";
import { CreateMembership } from "src/application/membership/useCases/createMembership";
import { GetCurrentMembership } from "src/application/membership/useCases/getCurrentMembership";
import { SetCurrentMembership } from "src/application/membership/useCases/setCurrentMembership";
import { AuthRequestModel } from "src/infra/http/auth/models/authRequestModel";
import { Cookies } from "src/infra/http/auth/decorators/cookies.decorator";
import { CookiesEnum } from "src/core/enum/cookies";
import { CompanyInstance } from "src/core/company/company-instance";
import { GetMembershipByUser } from "src/application/membership/useCases/getMembershipByUser";

@Controller("memberships")
export class MembershipController {
  constructor(
    private readonly createMembership: CreateMembership,
    private readonly setCurrentMembershipUseCase: SetCurrentMembership,
    private readonly getCurrentMembershipUseCase: GetCurrentMembership,
    private readonly getMembershipByUserIdUseCase: GetMembershipByUser
  ) { }

  @Post()
  async create(
    @Body() body: CreateMembershipBody,
    // @Cookies(CookiesEnum.CompanyId) companyId: string
  ) {
    const companyInstance = CompanyInstance.create(body.companyId);
    return await this.createMembership.execute(companyInstance, body);
  }

  @Post("/set-current")
  async setCurrentMembership(
    @Request() req: AuthRequestModel,
    @Cookies(CookiesEnum.CompanyId) companyId: string
  ) {
    const companyInstance = CompanyInstance.create(companyId);
    const userId = req.user.id
    const session = req.session
    return await this.setCurrentMembershipUseCase.execute(
      companyInstance,
      userId,
      session
    );
  }

  @Get('current')
  async getCurrentCompany(@Request() req: AuthRequestModel) {
    return await this.getCurrentMembershipUseCase.execute(req.session);
  }

  @Get(':userId')
  async getMembershipByUserId(@Param('userId') userId: string) {
    return await this.getMembershipByUserIdUseCase.execute(userId);
  }
}