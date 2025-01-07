import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { CookiesEnum } from "src/core/enum/cookies";
import { Cookies } from "src/infra/http/auth/decorators/cookies.decorator";
import { CreateChecklistTemplateItemDTO } from "./dtos/create-checklist-template-item";
import { CompanyInstance } from "src/core/company/company-instance";
import { CreateChecklistTemplateItem } from "src/application/checklist/checklist-item-template/use-cases/create-checklist-item-template";
import { ListChecklistTemplateItem } from "src/application/checklist/checklist-item-template/use-cases/list-checklist-item-template";
import { GetChecklistTemplateItemsByTemplateId } from "src/application/checklist/checklist-item-template/use-cases/get-checklist-item-by-id";

@Controller("checklist-template-item")
export class ChecklistTemplateItemController {
  constructor(
    private readonly _createChecklistTemplateItem: CreateChecklistTemplateItem,
    private readonly _listChecklistTemplateItem: ListChecklistTemplateItem,
    private readonly _getChecklistTemplateItemsByTemplateId: GetChecklistTemplateItemsByTemplateId,
  ) { }

  @Post()
  async create(
    @Cookies(CookiesEnum.CompanyId) companyId: string,
    @Body() body: CreateChecklistTemplateItemDTO
  ) {
    const companyInstance = CompanyInstance.create(companyId);

    return await this._createChecklistTemplateItem.execute(companyInstance, body);
  }

  @Get()
  async list(
    @Cookies(CookiesEnum.CompanyId) companyId: string
  ) {
    const companyInstance = CompanyInstance.create(companyId);

    return await this._listChecklistTemplateItem.execute(companyInstance);
  }

  @Get("template/:id")
  async getById(
    @Cookies(CookiesEnum.CompanyId) companyId: string,
    @Param("id") templateId: string
  ) {
    const companyInstance = CompanyInstance.create(companyId);

    return await this._getChecklistTemplateItemsByTemplateId.execute(companyInstance, templateId);
  }
}