import { Injectable } from "@nestjs/common";
import { CompanyInstance } from "src/core/company/company-instance";
import { ChecklistItem } from "src/core/domain/entities/checklist/checklist-item";
import { ChecklistItemRepository } from "src/core/domain/repositories/checklist/checklist-item-repository";

interface IRequest {
  checklistId: string;
  itemTemplateId: string;
  isConform: boolean;
}

@Injectable()
export class CreateChecklistItem {
  constructor(private readonly _checklistRepositoryItem: ChecklistItemRepository) { }

  async execute(companyInstance: CompanyInstance, item: IRequest): Promise<ChecklistItem> {
    const checklistItem = new ChecklistItem({
      checklistId: item.checklistId,
      itemTemplateId: item.itemTemplateId,
      isConform: item.isConform,
      createdAt: new Date(),
      updatedAt: new Date(),
    })

    return this._checklistRepositoryItem.create(companyInstance, checklistItem);
  }
}