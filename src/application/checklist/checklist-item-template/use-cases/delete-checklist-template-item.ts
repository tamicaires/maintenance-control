import { HttpStatus, Injectable } from "@nestjs/common";
import { CompanyInstance } from "src/core/company/company-instance";
import { ChecklistTemplateItemRepository } from "src/core/domain/repositories/checklist/checklist-template-item-repository";
import { ExceptionHandler } from "src/core/exceptions/ExceptionHandler";

@Injectable()
export class DeleteChecklistTemplateItem {
  constructor(
    private readonly checklistTemplateItemRepository: ChecklistTemplateItemRepository
  ) { }

  async execute(companyInstance: CompanyInstance, templateItemId: string) {
    const checklistTemplateItem = await this.checklistTemplateItemRepository.findById(
      companyInstance,
      templateItemId
    );

    if (!checklistTemplateItem) {
      throw new ExceptionHandler({
        message: "Item de checklist template não encontrado",
        status: HttpStatus.NOT_FOUND
      })
    }

    await this.checklistTemplateItemRepository.delete(companyInstance, templateItemId);

    return {
      message: "Item de checklist template deletado com sucesso"
    }
  }
}