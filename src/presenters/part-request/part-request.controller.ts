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
import { ApprovePartRequest } from "src/application/part-request/use-cases/approve-part-request";
import { ApprovePartRequestBody } from "./dto/approve-part-request";
import { CreatePartRequestBatch } from "src/application/part-request/use-cases/create-part-request-batch";
import { CreatePartRequestBatchBody } from "./dto/create-part-request-batch";
import { ListPartRequestByWorkOrder } from "src/application/part-request/use-cases/list-part-request-by-work-order";
import { GetPartRequestById } from "src/application/part-request/use-cases/get-part-request-by-id";

@Controller("part-requests")
export class PartRequestController {
  constructor(
    private readonly createPartRequest: CreatePartRequest,
    private readonly createPartRequestBatch: CreatePartRequestBatch,
    private readonly getPartRequestById: GetPartRequestById,
    private readonly listPartRequest: ListPartRequests,
    private readonly listPartRequestByWorkOrder: ListPartRequestByWorkOrder,
    private readonly rejectPartRequest: RejectPartRequest,
    private readonly approvePartRequest: ApprovePartRequest
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

  @Post("batch")
  async createBatch(
    @Body() body: CreatePartRequestBatchBody,
    @Request() req: AuthenticatedRequestModel,
    @Cookies(CookiesEnum.CompanyId) companyId: string
  ) {
    const companyInstance = CompanyInstance.create(companyId);
    const partRequests = await this.createPartRequestBatch.execute(
      companyInstance,
      req.user.id,
      body.batchData
    );
    return partRequests.map(PartRequestViewModel.toHttp);
  }

  @Get(":id")
  async getById(
    @Param("id") id: string,
    @Cookies(CookiesEnum.CompanyId) companyId: string
  ) {
    const companyInstance = CompanyInstance.create(companyId);
    const partRequest = await this.getPartRequestById.execute(
      companyInstance, 
      id
    );
    return PartRequestViewModel.toHttpWithRelationalInfo(partRequest);
  }

  @Get()
  async list(@Cookies(CookiesEnum.CompanyId) companyId: string) {
    const companyInstance = CompanyInstance.create(companyId);
    const partRequests = await this.listPartRequest.execute(companyInstance);
    return partRequests.map(PartRequestViewModel.toHttpWithRelationalInfo);
  }

  @Get("/work-order/:id")
  async listByWorkOrder(
    @Param("id") workOrderId: string,
    @Cookies(CookiesEnum.CompanyId) companyId: string
  ) {
    const companyInstance = CompanyInstance.create(companyId);
    const partRequests = await this.listPartRequestByWorkOrder.execute(
      companyInstance,
      workOrderId
    );
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

  @Post("approve/:id")
  async approve(
    @Body() body: ApprovePartRequestBody,
    @Param("id") partRequestId: string,
    @Cookies(CookiesEnum.CompanyId) companyId: string,
    @Request() req: AuthenticatedRequestModel
  ) {
    const companyInstance = CompanyInstance.create(companyId);
    return await this.approvePartRequest.execute(companyInstance, {
      partRequestId,
      approvedQuantity: body.approvedQuantity,
      handleById: req.user.id
    });
  }
}