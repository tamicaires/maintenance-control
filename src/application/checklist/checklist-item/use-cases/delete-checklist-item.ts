import { HttpStatus, Injectable } from "@nestjs/common";
import { CompanyInstance } from "src/core/company/company-instance";
import { ChecklistItemRepository } from "src/core/domain/repositories/checklist/checklist-item-repository";
import { ExceptionHandler } from "src/core/exceptions/ExceptionHandler";

@Injectable()
export class DeleteChecklistItem {
  constructor(private readonly _checklistItemCategory: ChecklistItemRepository) { }

  async execute(companyInstance: CompanyInstance, checklistItemId: string): Promise<{ message: string }> {
    const checklistItem = await this._checklistItemCategory.findById(companyInstance, checklistItemId);
    if (!checklistItem) {
      throw new ExceptionHandler({
        message: "Item de Checklist não encontrado",
        status: HttpStatus.NOT_FOUND
      })
    }

    await this._checklistItemCategory.delete(companyInstance, checklistItemId);

    return {
      message: "Item de Checklist deletado com sucesso"
    }
  }
}