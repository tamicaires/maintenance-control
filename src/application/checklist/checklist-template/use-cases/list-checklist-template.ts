import { Injectable } from "@nestjs/common";
import { CompanyInstance } from "src/core/company/company-instance";
import { ChecklistTemplateRepository } from "src/core/domain/repositories/checklist/checklist-template-repository";

@Injectable()
export class ListChecklistTemplate {
  constructor(private readonly _checklistTemplateRepository: ChecklistTemplateRepository) { }

  async execute(companyInstance: CompanyInstance) {
    return this._checklistTemplateRepository.list(companyInstance);
  }
}