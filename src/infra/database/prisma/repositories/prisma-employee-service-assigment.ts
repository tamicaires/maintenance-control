import { Injectable } from "@nestjs/common";
import { CompanyInstance } from "src/core/company/company-instance";
import { EmployeeServiceAssigment } from "src/core/domain/entities/employee-service-assigment";
import { EmployeeServiceAssigmentRepository } from "src/core/domain/repositories/employee-service-assigment-repository";
import { PrismaService } from "../prisma.service";

@Injectable()
export class PrismaEmployeeServiceAssigmentRepository implements EmployeeServiceAssigmentRepository {
  constructor(private readonly _prisma: PrismaService) { }

  async create(companyInstance: CompanyInstance, data: EmployeeServiceAssigment): Promise<EmployeeServiceAssigment> {
    const employeeServiceAssigment = await this._prisma.serviceAssignmentEmployee.create({
      data: {
        id: data.id,
        employeeId: data.employeeId,
        serviceAssignmentId: data.serviceAssignmentId,
        createdAt: data.createdAt,
        updatedAt: data.updatedAt
      }
    });
    return employeeServiceAssigment;
  }

  findById(companyInstance: CompanyInstance, id: string): Promise<EmployeeServiceAssigment> {
    throw new Error("Method not implemented.");
  }


}