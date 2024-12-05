import { CompanyInstance } from "src/core/company/company-instance";
import { EmployeeServiceAssigment } from "../entities/employee-service-assigment";

export abstract class EmployeeServiceAssigmentRepository {
  abstract create(companyInstance: CompanyInstance, data: EmployeeServiceAssigment): Promise<EmployeeServiceAssigment>;
  abstract findById(companyInstance: CompanyInstance, id: string): Promise<EmployeeServiceAssigment>;
  abstract findByEmployeeIdAndServiceAssigmentId(companyInstance: CompanyInstance, employeeId: string, serviceAssigmentId: string): Promise<EmployeeServiceAssigment | null>;
}