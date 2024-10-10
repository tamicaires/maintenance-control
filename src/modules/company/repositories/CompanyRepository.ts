import { Company } from '../entities/Company';

export abstract class CompanyRepository {
  abstract create(company: Company): Promise<void>;
  abstract findById(companyId: string): Promise<Company | null>;
  abstract findOne(companyName: string): Promise<Company | null>;
  abstract findMany(page: number, perPage: number): Promise<Company[]>;
}
