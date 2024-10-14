import { Body, Controller, Get, Param, Post, Request } from "@nestjs/common";
import { CreateMembershipBody } from "./dto/createMembershipBody";
import { AuthRequestModel } from "../auth/models/authRequestModel";
import { CreateMembership } from "src/modules/memberShip/useCases/createMembership";
import { SetCurrentMembership } from "src/modules/memberShip/useCases/setCurrentMembership";
import { GetCurrentMembership } from "src/modules/memberShip/useCases/getCurrentMembership";
import { GetMembershipByUser } from "src/modules/memberShip/useCases/getMembershipByUser";

@Controller("memberships")
export class MembershipController {
  constructor(
    private readonly createMembership: CreateMembership,
    private readonly setCurrentMembershipUseCase: SetCurrentMembership,
    private readonly getCurrentMembershipUseCase: GetCurrentMembership,
    private readonly getMembershipByUserIdUseCase: GetMembershipByUser
  ) { }

  @Post(":id")
  async create(
    @Param("id") companyId: string,
    @Body() body: CreateMembershipBody
  ) {
    return await this.createMembership.execute({
      companyId,
      userId: body.userId,
      role: body.roles
    });
  }

  @Post(":companyId/set-current")
  async setCurrentMembership(
    @Param('companyId') companyId: string,
    @Request() req: AuthRequestModel,
  ) {
    const userId = req.user.id
    const session = req.session
    return await this.setCurrentMembershipUseCase.execute(
      userId,
      companyId,
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