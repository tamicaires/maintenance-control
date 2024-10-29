import { Body, Controller, Get, Param, Post, Request } from "@nestjs/common";
import { CreatePartRequest } from "src/application/part-request/use-cases/create-part-request";
import { CookiesEnum } from "src/core/enum/cookies";
import { Cookies } from "src/infra/http/auth/decorators/cookies.decorator";
import { PartRequestBody } from "./dto/part-request-body";
import { AuthenticatedRequestModel } from "src/infra/http/auth/models/authenticateRequestModel";
import { CompanyInstance } from "src/core/company/company-instance";
import { ListPartRequests } from "src/application/part-request/use-cases/list-part-request";
import { PartRequestViewModel } from "./view-model/part-request-view-model";
import { RejectPartRequest } from "src/application/part-request/use-cases/reject-part-request";
import { RejectPartRequestBody } from "./dto/reject-part-request-body";

@Controller("part-requests")
export class PartRequestController {
  constructor(
    private readonly createPartRequest: CreatePartRequest,
    private readonly listPartRequest: ListPartRequests,
    private readonly rejectPartRequest: RejectPartRequest
  ) { }

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
    return PartRequestViewModel.toHttp(partRequest);
  }

  @Get()
  async list(@Cookies(CookiesEnum.CompanyId) companyId: string) {
    const companyInstance = CompanyInstance.create(companyId);
    const partRequests = await this.listPartRequest.execute(companyInstance);
    return partRequests.map(PartRequestViewModel.toHttpWithRelationalInfo);
  }

  @Post("reject/:id")
  async reject(
    @Body() body: RejectPartRequestBody,
    @Param("id") partRequestId: string,
    @Cookies(CookiesEnum.CompanyId) companyId: string,
    @Request() req: AuthenticatedRequestModel
  ) {
    const companyInstance = CompanyInstance.create(companyId);
    return await this.rejectPartRequest.execute(companyInstance, {
      partRequestId,
      rejectionReason: body.rejectionReason,
      handleById: req.user.id
    });
  }
}