import { CompanyInstance } from "src/core/company/company-instance";
import { Checklist } from "../../entities/checklist/checklist";

export abstract class ChecklistRepository {
  abstract create(
    companyInstance: CompanyInstance,
    item: Checklist
  ): Promise<Checklist>;
  abstract findById(companyInstance: CompanyInstance, id: string): Promise<Checklist | null>;
  abstract findChecklistByWorkOrder(companyInstance: CompanyInstance, workOrderId: string);
  abstract findByIdWithRelationalData(companyInstance: CompanyInstance, checklistId: string)
  abstract list(companyInstance: CompanyInstance): Promise<Checklist[]>;
  abstract delete(companyInstance: CompanyInstance, checklist: Checklist): Promise<void>;
  abstract deleteMany(companyInstance: CompanyInstance, checklistIds: string[]): Promise<void>;
}