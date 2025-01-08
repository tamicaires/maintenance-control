import { CompanyInstance } from "src/core/company/company-instance";
import { ChecklistTemplateItem } from "../../entities/checklist/checklist-template/checklist-template-item";

export abstract class ChecklistTemplateItemRepository {
  abstract create(companyInstance: CompanyInstance, templateItem: ChecklistTemplateItem): Promise<ChecklistTemplateItem>;
  abstract findById(companyInstance: CompanyInstance, id: string): Promise<ChecklistTemplateItem | null>;
  abstract list(companyInstance: CompanyInstance): Promise<ChecklistTemplateItem[]>;
  abstract findByTemplateId(companyInstance: CompanyInstance, templateId: string): Promise<ChecklistTemplateItem[]>;
  abstract delete(companyInstance: CompanyInstance, templateItemId: string): Promise<void>;
}