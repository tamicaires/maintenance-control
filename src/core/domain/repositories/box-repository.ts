import { CompanyInstance } from "src/core/company/company-instance";
import { Box } from "../entities/box";
import { IBoxFilters } from "src/shared/types/filters.interface";
import { IBoxWithCount } from "src/shared/types/box";

export abstract class BoxRepository {
  abstract create(companyInstance: CompanyInstance, box: Box): Promise<void>;
  abstract findById(companyInstance: CompanyInstance, id: string): Promise<Box | null>;
  abstract findByName(companyInstance: CompanyInstance, name: string): Promise<Box | null>;
  abstract list(companyInstance: CompanyInstance, page: number, perPage: number, filtes?: IBoxFilters): Promise<IBoxWithCount>;
  abstract getWithRelationalData(companyInstance: CompanyInstance);
  abstract delete(companyInstance: CompanyInstance, boxId: string): Promise<void>;
}