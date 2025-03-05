import { Injectable } from "@nestjs/common";
import { CompanyInstance } from "src/core/company/company-instance";
import { ServiceAssignmentRepository } from "src/core/domain/repositories/service-assignment-repository";
import { IUseCase } from "src/shared/protocols/use-case";

@Injectable()
export class DeleteAllAssigments implements IUseCase<any, any> {
  constructor(private readonly _serviceAssigmentRepository: ServiceAssignmentRepository) { }

  async execute(companyInstance: CompanyInstance): Promise<void> {
    await this._serviceAssigmentRepository.deleteAll(companyInstance);
  }
}