import { Controller, Get, Query, Request } from "@nestjs/common";
import { GetUserPermissions } from "src/application/permissions/useCase/getUserPermissions";
import { CookiesEnum } from "src/core/enum/cookies";
import { Cookies } from "../auth/decorators/cookies.decorator";
import { AuthenticatedRequestModel } from "../auth/models/authenticateRequestModel";
import { CompanyInstance } from "src/core/company/company-instance";

@Controller("auth")
export class AbilityController {
  constructor(private readonly _getUserPermissions: GetUserPermissions) { }

  @Get("/permissions")
  async getPermissions(
    @Cookies(CookiesEnum.CompanyId) companyId: string,
    @Request() request: AuthenticatedRequestModel,
  ) {
    console.log("companyId", companyId)
    const companyInstance = CompanyInstance.create(companyId);
    return this._getUserPermissions.execute(companyInstance, request.user.id)
  }
}