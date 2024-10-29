import { CompanyInstance } from "src/core/company/company-instance";
import { Part } from "../entities/part";

export abstract class PartRepository {
  abstract create(part: Part): Promise<void>;
  abstract findByPartnumber(partNumber: string): Promise<Part | null>;
  abstract findById(id: string): Promise<Part | null>;
  abstract list(): Promise<Part[]>;
  abstract save(part: Part): Promise<void>;
  abstract updateStockQuantity(companyInstance: CompanyInstance, partId: string, stockQuantity: number): Promise<void>;
}