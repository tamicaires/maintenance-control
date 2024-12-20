import { CompanyInstance } from "src/core/company/company-instance";
import { ChecklistCategory, ChecklistCategoryType } from "../../entities/checklist/checklist-category";

export abstract class ChecklistCategoryRepository {
  abstract create(
    companyInstance: CompanyInstance,
    data: ChecklistCategory
  ): Promise<ChecklistCategory>;
  abstract findByName(companyInstance: CompanyInstance, name: string): Promise<ChecklistCategory | null>;
  abstract findById(companyInstance: CompanyInstance, id: string): Promise<ChecklistCategory | null>;
  abstract findAll(): Promise<ChecklistCategoryType[]>;
}