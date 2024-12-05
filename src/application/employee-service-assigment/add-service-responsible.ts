import { HttpStatus, Injectable } from "@nestjs/common";
import { CompanyInstance } from "src/core/company/company-instance";
import { EmployeeServiceAssigment } from "src/core/domain/entities/employee-service-assigment";
import { EmployeeRepository } from "src/core/domain/repositories/employee-repository";
import { EmployeeServiceAssigmentRepository } from "src/core/domain/repositories/employee-service-assigment-repository";
import { ServiceAssignmentRepository } from "src/core/domain/repositories/service-assignment-repository";
import { ExceptionHandler } from "src/core/exceptions/ExceptionHandler";

interface IRequest {
  serviceAssigmentId: string;
  employeeId: string;
}

@Injectable()
export class AddServiceResponsible {
  constructor(
    private readonly _serviceAssigmentRepository: ServiceAssignmentRepository,
    private readonly _employeeRepository: EmployeeRepository,
    private readonly _employeeServiceAssigmentRepository: EmployeeServiceAssigmentRepository) { }

  async execute(companyInstance: CompanyInstance, data: IRequest) {
    const serviceAssigment = await this._serviceAssigmentRepository.findById(data.serviceAssigmentId);
    if (!serviceAssigment) {
      throw new ExceptionHandler({
        message: 'Designação de serviço não encontrada.',
        status: HttpStatus.NOT_FOUND
      })
    }

    const employee = await this._employeeRepository.findById(data.employeeId);
    if (!employee) {
      throw new ExceptionHandler({
        message: 'Profissional técnico não encontrado.',
        status: HttpStatus.NOT_FOUND
      })
    }

    const employeeAlreadyAssigned = await this._employeeServiceAssigmentRepository.findByEmployeeIdAndServiceAssigmentId(
      companyInstance,
      employee.id,
      serviceAssigment.id
    );
    if (employeeAlreadyAssigned) {
      throw new ExceptionHandler({
        message: 'Profissional técnico já designado para este serviço.',
        status: HttpStatus.BAD_REQUEST
      })
    }

    const employeeServiceAssigment = new EmployeeServiceAssigment({
      employeeId: data.employeeId,
      serviceAssignmentId: data.serviceAssigmentId,
      createdAt: new Date(),
      updatedAt: new Date()
    })

    return this._employeeServiceAssigmentRepository.create(companyInstance, employeeServiceAssigment)
  }
}