import { Body, Controller, Delete, Get, Param, Post } from "@nestjs/common";
import { CreateChecklistItem } from "src/application/checklist/checklist-item/use-cases/create-checklist-item";
import { Cookies } from "src/infra/http/auth/decorators/cookies.decorator";
import { CreateChecklistItemDTO } from "./dtos/create-checklist-item";
import { CompanyInstance } from "src/core/company/company-instance";
import { CookiesEnum } from "src/core/enum/cookies";
import { DeleteChecklistItem } from "src/application/checklist/checklist-item/use-cases/delete-checklist-item";
import { ListChecklistItemByChecklistId } from "src/application/checklist/checklist-item/use-cases/list-checklist-item";

@Controller('checklist-item')
export class ChecklistItemController {
  constructor(
    private readonly _createChecklistItem: CreateChecklistItem,
    private readonly _deleteChecklistItem: DeleteChecklistItem,
    private readonly _listChecklistItem: ListChecklistItemByChecklistId
  ) { }

  @Post()
  async create(
    @Cookies(CookiesEnum.CompanyId) companyId: string,
    @Body() body: CreateChecklistItemDTO
  ) {
    const companyInstance = CompanyInstance.create(companyId);

    return this._createChecklistItem.execute(companyInstance, body);
  }

  @Get('checklist/:id')
  async list(
    @Cookies(CookiesEnum.CompanyId) companyId: string,
    @Param('id') checklistId: string
  ) {
    const companyInstance = CompanyInstance.create(companyId);

    return this._listChecklistItem.execute(companyInstance, checklistId);
  }

  @Delete(':id')
  async delete(
    @Cookies(CookiesEnum.CompanyId) companyId: string,
    @Param('id') checklistItemId: string
  ) {
    const companyInstance = CompanyInstance.create(companyId);

    return this._deleteChecklistItem.execute(companyInstance, checklistItemId);
  }
}