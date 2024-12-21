import { Injectable } from "@nestjs/common";
import { CompanyInstance } from "src/core/company/company-instance";
import { ChecklistTemplateItemRepository } from "src/core/domain/repositories/checklist/checklist-template-item-repository";

@Injectable()
export class ListChecklistTemplateItem {
  constructor(private readonly _checklistTemplateItemRepository: ChecklistTemplateItemRepository) { }

  async execute(companyInstance: CompanyInstance) {
    return await this._checklistTemplateItemRepository.list(companyInstance);
  }
}