import { EmployeeRepository } from 'src/core/domain/repositories/employee-repository';
import { PrismaEmployeeMapper } from '../mappers/PrismaEmployeeMapper';
import { PrismaService } from '../prisma.service';
import { Injectable } from '@nestjs/common';
import { Employee, Employees } from 'src/core/domain/entities/employee';
import { CompanyInstance } from 'src/core/company/company-instance';
import { IEmployeeFilters } from 'src/shared/types/filters.interface';
import { Prisma } from '@prisma/client';
import { IEmployeeWithCount } from 'src/shared/types/employee.type';

@Injectable()
export class PrismaEmployeeRepository implements EmployeeRepository {
  constructor(private prisma: PrismaService) { }

  async create(employee: Employees): Promise<Employees> {
    await this.prisma.employee.create({
      data: employee,
    });

    return employee;
  }

  async findById(id: string): Promise<any> {
    const employeeRaw = await this.prisma.employee.findUnique({
      where: { id },
      include: {
        job: {
          select: {
            jobTitle: true,
          },
        },
      },
    });

    if (!employeeRaw) return null;

    return PrismaEmployeeMapper.toDomain(employeeRaw);
  }

  async save(employee: Employee): Promise<any> {
    const employeeRaw = PrismaEmployeeMapper.toPrisma(employee);

    return await this.prisma.employee.update({
      data: employeeRaw,
      where: { id: employeeRaw.id },
      include: {
        job: true,
      },
    });
  }

  async delete(id: string): Promise<void> {
    await this.prisma.employee.delete({
      where: { id },
    });
  }

  async getMany(
    companyInstance: CompanyInstance,
    filters: IEmployeeFilters,
    page: number,
    perPage: number
  ): Promise<IEmployeeWithCount> {
    const { isActive, jobTitle, startDate, endDate } = filters;

    const where: Prisma.EmployeeWhereInput = {
      companyId: companyInstance.getCompanyId(),
      AND: [
        isActive ? { isActive } : undefined,
        jobTitle ? { job: { jobTitle } } : undefined,
        startDate && endDate
          ? {
            createdAt: {
              gte: startDate,
              lte: endDate,
            },
          }
          : undefined,
      ].filter(Boolean) as Prisma.EmployeeWhereInput[],
    };

    const totalCount = await this.prisma.employee.count({ where });

    const employees = await this.prisma.employee.findMany({
      where,
      include: {
        job: {
          select: {
            jobTitle: true,
          },
        },
      },
      take: perPage,
      skip: (page - 1) * perPage,
    });

    return {
      employees: employees,
      totalCount
    };
  }

  async findOne(companyInstance: CompanyInstance, employeeName: string): Promise<Employees | null> {
    const companyId = companyInstance.getCompanyId();

    const employeeRaw = await this.prisma.employee.findUnique({
      where: { name: employeeName, companyId },
    });

    if (!employeeRaw) return null;

    return employeeRaw
  }

  async getEmployeeServices(id: string): Promise<any> {
    const employeeServices = await this.prisma.employee.findUnique({
      where: { id },
      select: {
        // serviceAssignments: {
        //   select: {
        //     service: true,
        //   },
        // },
      },
    });

    if (!employeeServices) return null;

    return employeeServices;
  }
}
