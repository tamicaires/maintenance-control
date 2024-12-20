import { CompanyInstance } from "src/core/company/company-instance";
import { ChecklistItem } from "../../entities/checklist/checklist-item";

export abstract class ChecklistItemRepository {
  abstract create(
    companyInstance: CompanyInstance,
    data: ChecklistItem
  ): Promise<ChecklistItem>;
  abstract findByName(companyInstance: CompanyInstance, name: string): Promise<ChecklistItem | null>;
  abstract findById(companyInstance: CompanyInstance, id: string): Promise<ChecklistItem | null>;
}