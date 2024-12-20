import { CompanyInstance } from "src/core/company/company-instance";
import { ChecklistItem } from "../../entities/checklist/checklist-item";

export abstract class ChecklistItemRepository {
  abstract create(
    companyInstance: CompanyInstance,
    item: ChecklistItem
  ): Promise<ChecklistItem>;
  abstract findById(companyInstance: CompanyInstance, id: string): Promise<ChecklistItem | null>;
  abstract findByChecklistId(companyInstance: CompanyInstance, checklistId: string): Promise<ChecklistItem[]>;
}