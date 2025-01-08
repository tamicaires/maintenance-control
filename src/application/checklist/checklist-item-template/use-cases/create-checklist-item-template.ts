import { HttpStatus, Injectable } from "@nestjs/common";
import { CompanyInstance } from "src/core/company/company-instance";
import { ChecklistTemplateItem } from "src/core/domain/entities/checklist/checklist-template/checklist-template-item";
import { ChecklistTemplateItemRepository } from "src/core/domain/repositories/checklist/checklist-template-item-repository";
import { ChecklistTemplateRepository } from "src/core/domain/repositories/checklist/checklist-template-repository";
import { ExceptionHandler } from "src/core/exceptions/ExceptionHandler";

interface IRequest {
  description: string;
  weight: number;
  templateId: string;
  checklistCategoryId: string;
}

@Injectable()
export class CreateChecklistTemplateItem {
  constructor(
    private readonly _checklistTemplateItemRepository: ChecklistTemplateItemRepository,
    private readonly _checklistTemplateRepository: ChecklistTemplateRepository
  ) { }

  async execute(companyInstance: CompanyInstance, item: IRequest): Promise<ChecklistTemplateItem> {
    const checklistTemplate = await this._checklistTemplateRepository.findById(
      companyInstance,
      item.templateId
    )
    if (!checklistTemplate) {
      throw new ExceptionHandler({
        message: "Checklist template não encontrado",
        status: HttpStatus.NOT_FOUND
      })
    }

    const checklistItem = new ChecklistTemplateItem({
      description: item.description,
      weight: item.weight,
      checklistCategoryId: item.checklistCategoryId,
      templateId: item.templateId,
      createdAt: new Date(),
      updatedAt: new Date()
    })

    return this._checklistTemplateItemRepository.create(companyInstance, checklistItem);
  }
}