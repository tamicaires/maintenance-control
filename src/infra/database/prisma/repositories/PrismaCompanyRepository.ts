import { PrismaService } from '../prisma.service';
import { Injectable } from '@nestjs/common';
import { PrismaCompanyMapper } from '../mappers/PrismaCompanyMapper';
import { CompanyRepository } from 'src/domain/company/repositories/CompanyRepository';
import { Company } from 'src/domain/company/entities/Company';
import { CompanyInstance } from 'src/core/company/company-instance';

@Injectable()
export class PrismaCompanyRepository implements CompanyRepository {
  constructor(private prisma: PrismaService) {}

  async create(company: Company): Promise<void> {
    const companyRaw = PrismaCompanyMapper.toPrisma(company);

    await this.prisma.company.create({ data: companyRaw });
  }

  async findOne(companyName: string): Promise<Company | null> {
    const companyRaw = await this.prisma.company.findUnique({
      where: { name: companyName },
    });

    if (!companyRaw) return null;

    return PrismaCompanyMapper.toDomain(companyRaw);
  }

  async findById(companyInstance: CompanyInstance): Promise<Company | null> {
    const companyRaw = await this.prisma.company.findUnique({
      where: { id: companyInstance.getCompanyId() },
    });

    if (!companyRaw) return null;

    return PrismaCompanyMapper.toDomain(companyRaw);
  }

  async findMany(page: number, perPage: number): Promise<Company[]> {
    const companiesRaw = await this.prisma.company.findMany({
      skip: (page - 1) * perPage,
      take: perPage,
    });

    return companiesRaw.map(PrismaCompanyMapper.toDomain);
  }



  // async create(company: Company): Promise<Company> {
  //   const employeeRaw = PrismaEmployeeMapper.toPrisma(company);

  //   await this.prisma.employee.create({
  //     data: employeeRaw,
  //   });
  // }

  // async findOne(employeeName: string): Promise<Employee | null> {
  //   const employeeRaw = await this.prisma.employee.findUnique({
  //     where: { name: employeeName },
  //   });

  //   if (!employeeRaw) return null;

  //   return PrismaEmployeeMapper.toDomain(employeeRaw);
  // }
}
