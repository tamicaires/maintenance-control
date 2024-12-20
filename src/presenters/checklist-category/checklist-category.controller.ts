import { Body, Controller, Post, Get, Param } from "@nestjs/common";
import { CreateChecklistCategory } from "src/application/checklist/checklist-category/use-cases/create-checklist-category";
import { CompanyInstance } from "src/core/company/company-instance";
import { CookiesEnum } from "src/core/enum/cookies";
import { Cookies } from "src/infra/http/auth/decorators/cookies.decorator";
import { ChecklistCategoryDto } from "./dtos/create-checklist-category";
import { GetChecklistCategoryById } from "src/application/checklist/checklist-category/use-cases/get-by-id";
import { ListChecklistCategories } from "src/application/checklist/checklist-category/use-cases/list-checklist-categories";

@Controller("checklist-category")
export class ChecklistCategoryController {
  constructor(
    private readonly _createCheckListCategory: CreateChecklistCategory,
    private readonly _getChecklistCategoryById: GetChecklistCategoryById,
    private readonly _listChecklistCategory: ListChecklistCategories,
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

  @Get(":id")
  async getById(
    @Cookies(CookiesEnum.CompanyId) companyId: string,
    @Param("id") checklistCategoryId: string
  ) {
    const companyInstance = CompanyInstance.create(companyId);

    return await this._getChecklistCategoryById.execute(
      companyInstance,
      checklistCategoryId
    );
  }

  @Get()
  async list(
    @Cookies(CookiesEnum.CompanyId) companyId: string
  ) {
    const companyInstance = CompanyInstance.create(companyId);

    return await this._listChecklistCategory.execute(
      companyInstance
    );
  }
}