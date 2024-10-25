import { Company } from "src/core/domain/entities/company";

export class CompanyViewModel {
  static toHttp(company: Company) {
    return {
      id: company.id,
      name: company.name,
      cnpj: company.cnpj,
      email: company.email,
      phone: company.phone,
      address: company.address,
      createdAt: company.createdAt,
      updatedAt: company.updatedAt
    }
  }
}