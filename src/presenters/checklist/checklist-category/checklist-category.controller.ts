import { Body, Controller, Post, Get, Param, Delete } from "@nestjs/common";
import { CreateChecklistCategory } from "src/application/checklist/checklist-category/use-cases/create-checklist-category";
import { CompanyInstance } from "src/core/company/company-instance";
import { CookiesEnum } from "src/core/enum/cookies";
import { Cookies } from "src/infra/http/auth/decorators/cookies.decorator";
import { ChecklistCategoryDto } from "./dtos/create-checklist-category";
import { GetChecklistCategoryById } from "src/application/checklist/checklist-category/use-cases/get-by-id";
import { ListChecklistCategories } from "src/application/checklist/checklist-category/use-cases/list-checklist-categories";
import { DeleteChecklistCategory } from "src/application/checklist/checklist-category/use-cases/delete-checklist-category";

@Controller("checklist-category")
export class ChecklistCategoryController {
  constructor(
    private readonly _createCheckListCategory: CreateChecklistCategory,
    private readonly _getChecklistCategoryById: GetChecklistCategoryById,
    private readonly _listChecklistCategory: ListChecklistCategories,
    private readonly _deleteChecklistCategory: DeleteChecklistCategory
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

  @Get('template/:id')
  async listByTemplateId(
    @Cookies(CookiesEnum.CompanyId) companyId: string,
    @Param("id") templateId: string
  ) {
    const companyInstance = CompanyInstance.create(companyId);

    return await this._listChecklistCategory.execute(
      companyInstance,
      templateId
    );

  }

  @Delete(':id')
  async deleteChecklistCategory(
    @Cookies(CookiesEnum.CompanyId) companyId: string,
    @Param('id') checklistCategoryId: string
  ) {
    const companyInstance = CompanyInstance.create(companyId);

    return await this._deleteChecklistCategory.execute(
      companyInstance,
      checklistCategoryId
    );
  }
}