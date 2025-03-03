import { CompanyInstance } from "src/core/company/company-instance";
import { ChecklistItem } from "../../entities/checklist/checklist-item";

export abstract class ChecklistItemRepository {
  abstract create(
    companyInstance: CompanyInstance,
    item: ChecklistItem
  ): Promise<ChecklistItem>;
  abstract createBatch(companyInstance: CompanyInstance, checklistItems: ChecklistItem[])
  abstract findById(companyInstance: CompanyInstance, id: string): Promise<ChecklistItem | null>;
  abstract findByChecklistId(companyInstance: CompanyInstance, checklistId: string): Promise<ChecklistItem[]>;
  abstract delete(companyInstance: CompanyInstance, itemId: string): Promise<void>;
  abstract changeConformity(companyInstance: CompanyInstance, itemId: string, isConform: boolean): Promise<ChecklistItem>;
}