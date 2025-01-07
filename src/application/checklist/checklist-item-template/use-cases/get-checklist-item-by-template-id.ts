import { HttpStatus, Injectable } from "@nestjs/common";
import { CompanyInstance } from "src/core/company/company-instance";
import { ChecklistTemplateItemRepository } from "src/core/domain/repositories/checklist/checklist-template-item-repository";
import { ChecklistTemplateRepository } from "src/core/domain/repositories/checklist/checklist-template-repository";
import { ExceptionHandler } from "src/core/exceptions/ExceptionHandler";

@Injectable()
export class GetChecklistTemplateItemsByTemplateId {
  constructor(
    private readonly _checklistTempleateRepository: ChecklistTemplateRepository,
    private readonly _checklistTemplateItemRepository: ChecklistTemplateItemRepository
  ) { }

  async execute(companyInstance: CompanyInstance, templateId: string) {
    const template = await this._checklistTempleateRepository.findById(companyInstance, templateId);
    if (!template) {
      throw new ExceptionHandler({
        message: "Checklist Template não encontrado",
        status: HttpStatus.NOT_FOUND
      })
    }

    return this._checklistTemplateItemRepository.findByTemplateId(companyInstance, templateId);
  }
}