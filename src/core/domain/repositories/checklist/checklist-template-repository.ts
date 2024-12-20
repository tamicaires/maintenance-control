import { CompanyInstance } from "src/core/company/company-instance";
import { ChecklistTemplate } from "../../entities/checklist/checklist-template/checklist-template";

export abstract class ChecklistTemplateRepository {
  abstract create(companyInstance: CompanyInstance, template: ChecklistTemplate): Promise<ChecklistTemplate>;
  abstract findById(companyInstance: CompanyInstance, id: string): Promise<ChecklistTemplate | null>;
}

