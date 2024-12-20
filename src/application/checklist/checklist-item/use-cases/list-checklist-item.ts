import { Injectable } from "@nestjs/common";
import { CompanyInstance } from "src/core/company/company-instance";
import { ChecklistItem } from "src/core/domain/entities/checklist/checklist-item";
import { ChecklistItemRepository } from "src/core/domain/repositories/checklist/checklist-item-repository";

@Injectable()
export class ListChecklistItemByChecklistId{
  constructor(private readonly checklistItemRepository: ChecklistItemRepository) { }

  async execute(companyInstance: CompanyInstance, checklistId: string): Promise<ChecklistItem[]> {
    return this.checklistItemRepository.findByChecklistId(companyInstance, checklistId);
  }
}