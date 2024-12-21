import { CompanyInstance } from "src/core/company/company-instance";
import { Checklist } from "../../entities/checklist/checklist";

export abstract class ChecklistRepository {
  abstract create(
    companyInstance: CompanyInstance,
    item: Checklist
  ): Promise<Checklist>;
  abstract findById(companyInstance: CompanyInstance, id: string): Promise<Checklist | null>;
  abstract list(companyInstance: CompanyInstance): Promise<Checklist[]>;
}