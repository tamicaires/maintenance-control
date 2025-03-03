import { HttpStatus, Injectable } from "@nestjs/common";
import { CompanyInstance } from "src/core/company/company-instance";
import { ChecklistRepository } from "src/core/domain/repositories/checklist/checklist-repository";
import { ExceptionHandler } from "src/core/exceptions/ExceptionHandler";
import { GetChecklistAdapter } from "../adapters/get-checklist-adapter";
import { IChecklistTransformedResponse } from "src/shared/types/checklist";
import { IUseCase } from "src/shared/protocols/use-case";

interface IRequest {
  checklistId: string;
}

@Injectable()
export class GetChecklistById implements IUseCase<IRequest, IChecklistTransformedResponse> {
  constructor(private readonly _checklistRepository: ChecklistRepository) { }

  async execute(companyInstance: CompanyInstance, data: IRequest): Promise<IChecklistTransformedResponse> {
    const checklist = await this._checklistRepository.findByIdWithRelationalData(
      companyInstance,
      data.checklistId
    )
    console.log("checklist id", data.checklistId)
    console.log("checklistExists", checklist)
    if (!checklist) {
      throw new ExceptionHandler({
        message: "Checklist não encontrado",
        status: HttpStatus.NOT_FOUND
      })
    }
    console.log("checklistExists", checklist)
    const tranformed = GetChecklistAdapter.transformResponse(checklist);
    console.log("tranformed", tranformed)
    return tranformed
  }
}