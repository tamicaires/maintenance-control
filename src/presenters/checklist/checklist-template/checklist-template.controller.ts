import { Body, Controller, Get, Post } from "@nestjs/common";
import { CreateChecklistTemplate } from "src/application/checklist/checklist-template/use-cases/create-checklist-template";
import { ChecklistTemplateDto } from "./dtos/checklist-template";
import { Cookies } from "src/infra/http/auth/decorators/cookies.decorator";
import { CookiesEnum } from "src/core/enum/cookies";
import { CompanyInstance } from "src/core/company/company-instance";
import { ListChecklistTemplate } from "src/application/checklist/checklist-template/use-cases/list-checklist-template";

@Controller("checklist-template")
export class ChecklistTemplateController {
  constructor(
    private readonly _createChecklistTemplate: CreateChecklistTemplate,
    private readonly _listChecklistTemplate: ListChecklistTemplate,
  ) { }

  @Post()
  async create(
    @Cookies(CookiesEnum.CompanyId) companyId: string,
    @Body() data: ChecklistTemplateDto
  ) {
    const companyInstance = CompanyInstance.create(companyId);

    return this._createChecklistTemplate.execute(companyInstance, data);
  }

  @Get()
  async list(
    @Cookies(CookiesEnum.CompanyId) companyId: string,
  ) {
    const companyInstance = CompanyInstance.create(companyId);

    return this._listChecklistTemplate.execute(companyInstance);
  }
}