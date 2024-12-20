import { Body, Controller, Post } from "@nestjs/common";
import { CreateChecklistItem } from "src/application/checklist/checklist-item/use-cases/create-checklist-item";
import { Cookies } from "src/infra/http/auth/decorators/cookies.decorator";
import { CreateChecklistItemDTO } from "./dtos/create-checklist-item";
import { CompanyInstance } from "src/core/company/company-instance";
import { CookiesEnum } from "src/core/enum/cookies";

@Controller('checklist-item')
export class ChecklistItemController {
  constructor(private readonly _createChecklistItem: CreateChecklistItem) { }

  @Post()
  async create(
    @Cookies(CookiesEnum.CompanyId) companyId: string,
    @Body() body: CreateChecklistItemDTO
  ) {
    const companyInstance = CompanyInstance.create(companyId);

    return this._createChecklistItem.execute(companyInstance, body);
  }
}