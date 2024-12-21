import { Body, Controller, Post } from "@nestjs/common";
import { CookiesEnum } from "src/core/enum/cookies";
import { Cookies } from "src/infra/http/auth/decorators/cookies.decorator";
import { CreateChecklistDTO } from "./dtos/create-checklist";
import { CompanyInstance } from "src/core/company/company-instance";
import { CreateChecklist } from "src/application/checklist/checklist/use-cases/create-checklist";

@Controller('checklist')
export class ChecklistController {
  constructor(private readonly _createChecklist: CreateChecklist) { }

  @Post()
  async create(
    @Cookies(CookiesEnum.CompanyId) companyId: string,
    @Body() body: CreateChecklistDTO
  ) {
    const companyInstance = CompanyInstance.create(companyId);

    return this._createChecklist.execute(companyInstance, body);
  }
}