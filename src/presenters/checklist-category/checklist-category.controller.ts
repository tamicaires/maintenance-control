import { Body, Controller, Post } from "@nestjs/common";
import { CreateChecklistCategory } from "src/application/checklist/checklist-category/use-cases/create-checklist-category";
import { CompanyInstance } from "src/core/company/company-instance";
import { CookiesEnum } from "src/core/enum/cookies";
import { Cookies } from "src/infra/http/auth/decorators/cookies.decorator";
import { ChecklistCategoryDto } from "./dtos/create-checklist-category";

@Controller("checklist-category")
export class ChecklistCategoryController {
  constructor(
    private readonly _createCheckListCategory: CreateChecklistCategory,
  ) { }

  @Post()
  async create(
    @Cookies(CookiesEnum.CompanyId) companyId: string,
    @Body() data: ChecklistCategoryDto
  ) {
    const companyInstance = CompanyInstance.create(companyId);

    return await this._createCheckListCategory.execute(
      companyInstance,
      data
    );
  }
}