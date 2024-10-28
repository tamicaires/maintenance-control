import { Body, Controller, Post, Request } from "@nestjs/common";
import { CreatePartRequest } from "src/application/part-request/use-cases/create-part-request";
import { CookiesEnum } from "src/core/enum/cookies";
import { Cookies } from "src/infra/http/auth/decorators/cookies.decorator";
import { PartRequestBody } from "./dto/part-request-body";
import { AuthenticatedRequestModel } from "src/infra/http/auth/models/authenticateRequestModel";
import { CompanyInstance } from "src/core/company/company-instance";

@Controller("part-requests")
export class PartRequestController {
  constructor(private readonly createPartRequest: CreatePartRequest) { }

  @Post()
  async create(
    @Body() body: PartRequestBody,
    @Cookies(CookiesEnum.CompanyId) companyId: string,
    @Request() req: AuthenticatedRequestModel
  ) {
    const companyInstance = CompanyInstance.create(companyId);
    const partRequest = await this.createPartRequest.execute(companyInstance, {
      ...body,
      requestedById: req.user.id
    });
    return partRequest;
  }
}