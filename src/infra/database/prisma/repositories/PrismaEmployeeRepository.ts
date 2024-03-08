import { Employee } from "src/modules/employee/entities/Employee";
import { EmployeeRepository } from "src/modules/employee/repositories/EmployeeRepository";
import { PrismaEmployeeMapper } from "../mappers/PrismaEmployeeMapper";
import { PrismaService } from "../prisma.service";
import { Injectable } from "@nestjs/common";

@Injectable()
export class PrismaEmployeeRepository implements EmployeeRepository {
  constructor(private prisma: PrismaService){}
  
  async create(employee: Employee): Promise<void> {
    const employeeRaw = PrismaEmployeeMapper.toPrisma(employee);
    
    await this.prisma.employee.create({
      data: employeeRaw
    });
  };

  async findById(id: string): Promise<Employee | null> {
    const employeeRaw = await this.prisma.employee.findUnique({
      where: { id }
    });

    if(!employeeRaw) return null;

    return PrismaEmployeeMapper.toDomain(employeeRaw)
  };

  async save(employee: Employee): Promise<void> {
    const employeeRaw = PrismaEmployeeMapper.toPrisma(employee);

    await this.prisma.employee.update({
      data: employeeRaw,
      where: { id: employeeRaw.id}
    });
  };
  
  async delete(id: string): Promise<void> {
    await this.prisma.employee.delete({
      where: { id }
    });
  };

  async getMany(page: number, perPage: number): Promise<Employee[]> {
    const employees = await this.prisma.employee.findMany({
      take: page,
      skip: (page -1) * perPage
    });

    return employees.map(PrismaEmployeeMapper.toDomain )
  };
  
  async findOne(employeeName: string): Promise<Employee | null> {
    const employeeRaw = await this.prisma.employee.findUnique({
      where: { name: employeeName }  
    });

    if(!employeeRaw) return null;

    return PrismaEmployeeMapper.toDomain(employeeRaw);
  };
};