import { HttpStatus, Injectable } from "@nestjs/common";
import { CompanyInstance } from "src/core/company/company-instance";
import { Checklist } from "src/core/domain/entities/checklist/checklist";
import { ChecklistRepository } from "src/core/domain/repositories/checklist/checklist-repository";
import { ExceptionHandler } from "src/core/exceptions/ExceptionHandler";
import { IUseCase } from "src/shared/protocols/use-case";
import { IChecklistTransformedResponse } from "src/shared/types/checklist";
import { GetChecklistAdapter } from "../adapters/get-checklist-adapter";

interface IRequest {
  workOrderId: string;
}

@Injectable()
export class GetChecklistByWorkOrder implements IUseCase<IRequest, IChecklistTransformedResponse | null> {
  constructor(private readonly _checklistRepository: ChecklistRepository) { }

  async execute(companyInstance: CompanyInstance, data: IRequest): Promise<IChecklistTransformedResponse | null> {
    const checklist = await this._checklistRepository.findChecklistByWorkOrder(companyInstance, data.workOrderId);
    if (!checklist) {
      return null
    }
    return GetChecklistAdapter.transformResponse(checklist)

  }


}