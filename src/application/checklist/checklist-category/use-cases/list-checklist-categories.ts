import { Injectable } from "@nestjs/common";
import { CompanyInstance } from "src/core/company/company-instance";
import { ChecklistCategoryRepository } from "src/core/domain/repositories/checklist/checklist-category-repository";

@Injectable()
export class ListChecklistCategories {
  constructor(private readonly _checklistCategoryRepository: ChecklistCategoryRepository) { }

  async execute(companyInstance: CompanyInstance) {
    return await this._checklistCategoryRepository.findAll(companyInstance);
  }
}