import { CompanyInstance } from 'src/core/company/company-instance';
import { Company } from '../entities/company';

export abstract class CompanyRepository {
  abstract create(company: Company): Promise<void>;
  abstract findById(companyInstance: CompanyInstance): Promise<Company | null>;
  abstract findOne(companyName: string): Promise<Company | null>;
  abstract findMany(page: number, perPage: number): Promise<Company[]>;
}
