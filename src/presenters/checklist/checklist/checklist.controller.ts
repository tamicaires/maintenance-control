import { Body, Controller, Delete, Get, Param, Post, Request } from "@nestjs/common";
import { CookiesEnum } from "src/core/enum/cookies";
import { Cookies } from "src/infra/http/auth/decorators/cookies.decorator";
import { CreateChecklistDTO } from "./dtos/create-checklist";
import { CompanyInstance } from "src/core/company/company-instance";
import { CreateChecklist } from "src/application/checklist/checklist/use-cases/create-checklist";
import { ListChecklists } from "src/application/checklist/checklist/use-cases/list-checklists";
import { GetChecklistById } from "src/application/checklist/checklist/use-cases/get-checklist";
import { AuthenticatedRequestModel } from "src/infra/http/auth/models/authenticateRequestModel";
import { DeleteChecklist } from "src/application/checklist/checklist/use-cases/delete-checklist";
import { GetChecklistByWorkOrder } from "src/application/checklist/checklist/use-cases/get-checklist-by-work-order";

@Controller('checklist')
export class ChecklistController {
  constructor(
    private readonly _createChecklist: CreateChecklist,
    private readonly _listChecklist: ListChecklists,
    private readonly _getChecklistByIdWithRelationalInfo: GetChecklistById,
    private readonly _getChecklistByWorkOrder: GetChecklistByWorkOrder,
    private readonly _deleteChecklist: DeleteChecklist,
  ) { }

  @Post()
  async create(
    @Request() request: AuthenticatedRequestModel,
    @Cookies(CookiesEnum.CompanyId) companyId: string,
    @Body() body: CreateChecklistDTO
  ) {
    const companyInstance = CompanyInstance.create(companyId);

    return this._createChecklist.execute(companyInstance, {
      ...body,
      startedBy: request.user.id,
    });
  }

  @Get(':id')
  async getById(
    @Cookies(CookiesEnum.CompanyId) companyId: string,
    @Param('id') checklistId: string,
  ) {
    const companyInstance = CompanyInstance.create(companyId);
    return this._getChecklistByIdWithRelationalInfo.execute(companyInstance, { checklistId })
  }

  @Get('workOrder/:id')
  async getByWorkOrder(
    @Cookies(CookiesEnum.CompanyId) companyId: string,
    @Param('id') workOrderId: string,
  ) {
    const companyInstance = CompanyInstance.create(companyId);

    return await this._getChecklistByWorkOrder.execute(companyInstance, { workOrderId })
  }

  @Get()
  async list(@Cookies(CookiesEnum.CompanyId) companyId: string) {
    const companyInstance = CompanyInstance.create(companyId);

    return this._listChecklist.execute(companyInstance);
  }

  @Delete(':id')
  async deleteChecklist(
    @Cookies(CookiesEnum.CompanyId) companyId: string,
    @Param('id') checklistId: string
  ) {
    const companyInstance = CompanyInstance.create(companyId);
    return this._deleteChecklist.execute(companyInstance, { checklistId });
  }
}