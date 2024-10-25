import { Company as CompanyRaw } from '@prisma/client';
import { Company } from 'src/core/domain/entities/company';

export class PrismaCompanyMapper {
  static toPrisma({
    id,
    name,
    cnpj,
    email,
    phone,
    address,
    createdAt,
    updatedAt,
  }: Company): CompanyRaw {
    return {
      id,
      name,
      cnpj,
      email,
      phone,
      address,
      createdAt,
      updatedAt,
    };
  }

  static toDomain({
    id,
    name,
    cnpj,
    email,
    phone,
    address,
    createdAt,
    updatedAt,
  }: CompanyRaw): Company {
    return new Company(
      {
        name,
        cnpj,
        email,
        phone,
        address,
        createdAt,
        updatedAt,
      },
      id,
    );
  }
}
