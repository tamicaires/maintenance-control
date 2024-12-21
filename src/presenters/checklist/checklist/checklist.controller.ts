import { Body, Controller, Get, Post } from "@nestjs/common";
import { CookiesEnum } from "src/core/enum/cookies";
import { Cookies } from "src/infra/http/auth/decorators/cookies.decorator";
import { CreateChecklistDTO } from "./dtos/create-checklist";
import { CompanyInstance } from "src/core/company/company-instance";
import { CreateChecklist } from "src/application/checklist/checklist/use-cases/create-checklist";
import { ListChecklists } from "src/application/checklist/checklist/use-cases/list-checklists";

@Controller('checklist')
export class ChecklistController {
  constructor(
    private readonly _createChecklist: CreateChecklist,
    private readonly _listChecklist: ListChecklists
  ) { }

  @Post()
  async create(
    @Cookies(CookiesEnum.CompanyId) companyId: string,
    @Body() body: CreateChecklistDTO
  ) {
    const companyInstance = CompanyInstance.create(companyId);

    return this._createChecklist.execute(companyInstance, body);
  }

  @Get()
  async list(@Cookies(CookiesEnum.CompanyId) companyId: string) {
    const companyInstance = CompanyInstance.create(companyId);

    return this._listChecklist.execute(companyInstance);
  }
}