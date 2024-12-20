import { Body, Controller, Post } from "@nestjs/common";
import { CreateChecklistTemplate } from "src/application/checklist/checklist-template/use-cases/create-checklist-template";
import { ChecklistTemplateDto } from "./dtos/checklist-template";
import { Cookies } from "src/infra/http/auth/decorators/cookies.decorator";
import { CookiesEnum } from "src/core/enum/cookies";
import { CompanyInstance } from "src/core/company/company-instance";

@Controller("checklist-template")
export class ChecklistTemplateController {
  constructor(private readonly _createChecklistTemplate: CreateChecklistTemplate) { }

  @Post()
  async create(
    @Cookies(CookiesEnum.CompanyId) companyId: string,
    @Body() data: ChecklistTemplateDto
  ) {
    const companyInstance = CompanyInstance.create(companyId);

    return this._createChecklistTemplate.execute(companyInstance, data);
  }
}