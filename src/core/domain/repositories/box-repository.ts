import { CompanyInstance } from "src/core/company/company-instance";
import { Box } from "../entities/box";

export abstract class BoxRepository {
  abstract create(companyInstance: CompanyInstance, box: Box): Promise<void>;
  abstract findById(companyInstance: CompanyInstance, id: string): Promise<Box | null>;
  abstract findByName(companyInstance: CompanyInstance, name: string): Promise<Box | null>;
}