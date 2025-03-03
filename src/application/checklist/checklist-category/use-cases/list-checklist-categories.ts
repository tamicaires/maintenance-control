import { HttpStatus, Injectable } from "@nestjs/common";
import { CompanyInstance } from "src/core/company/company-instance";
import { ChecklistCategory } from "src/core/domain/entities/checklist/checklist-category";
import { ChecklistTemplateItem } from "src/core/domain/entities/checklist/checklist-template/checklist-template-item";
import { ChecklistCategoryRepository } from "src/core/domain/repositories/checklist/checklist-category-repository";
import { ChecklistTemplateRepository } from "src/core/domain/repositories/checklist/checklist-template-repository";
import { ExceptionHandler } from "src/core/exceptions/ExceptionHandler";

export interface IChecklistCategoryDto extends ChecklistCategory {
  items: ChecklistTemplateItem[];
}

@Injectable()
export class ListChecklistCategories {
  constructor(
    private readonly _checklistTemplateRepository: ChecklistTemplateRepository,
    private readonly _checklistCategoryRepository: ChecklistCategoryRepository
  ) { }

  async execute(companyInstance: CompanyInstance, templateId: string) {
    const templateExists = await this._checklistTemplateRepository.findById(companyInstance, templateId);
    if (!templateExists) {
      throw new ExceptionHandler({
        message: "Não foi possivel encontrar checklist template vinculado a esta categoria",
        status: HttpStatus.NOT_FOUND
      })

    }

    const checklistCategories = await this._checklistCategoryRepository.findByTemplateId(companyInstance, templateId);
    const categories: IChecklistCategoryDto[] = checklistCategories.map((category) => {
      return {
        id: category.id,
        name: category.name,
        description: category.description,
        templateId: category.templateId,
        items: category.ChecklistItemTemplate,
        createdAt: category.createdAt,
        updatedAt: category.updatedAt,
      }
    });

    return categories;
  }
}