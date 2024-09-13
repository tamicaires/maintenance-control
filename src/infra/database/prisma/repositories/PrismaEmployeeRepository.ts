import { Employee } from 'src/modules/employee/entities/Employee';
import { EmployeeRepository } from 'src/modules/employee/repositories/EmployeeRepository';
import { PrismaEmployeeMapper } from '../mappers/PrismaEmployeeMapper';
import { PrismaService } from '../prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PrismaEmployeeRepository implements EmployeeRepository {
  constructor(private prisma: PrismaService) {}

  async create(employee: Employee): Promise<void> {
    const employeeRaw = PrismaEmployeeMapper.toPrisma(employee);

    await this.prisma.employee.create({
      data: employeeRaw,
    });
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
        job: true ,
      },
    });
  }

  async delete(id: string): Promise<void> {
    await this.prisma.employee.delete({
      where: { id },
    });
  }

  async getMany(page: number, perPage: number): Promise<any> {
    const employees = await this.prisma.employee.findMany({
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

    return employees;
  }

  async findOne(employeeName: string): Promise<Employee | null> {
    const employeeRaw = await this.prisma.employee.findUnique({
      where: { name: employeeName },
    });

    if (!employeeRaw) return null;

    return PrismaEmployeeMapper.toDomain(employeeRaw);
  }

  async getEmployeeServices(id: string): Promise<any> {
    const employeeServices = await this.prisma.employee.findUnique({
      where: { id },
      select: {
        serviceAssignments: {
          select: {
            service: true,
          },
        },
      },
    });

    if (!employeeServices) return null;

    return employeeServices;
  }
}
