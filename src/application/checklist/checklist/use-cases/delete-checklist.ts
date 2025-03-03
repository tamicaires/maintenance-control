import { HttpStatus, Injectable } from "@nestjs/common";
import { CompanyInstance } from "src/core/company/company-instance";
import { ChecklistRepository } from "src/core/domain/repositories/checklist/checklist-repository";
import { ExceptionHandler } from "src/core/exceptions/ExceptionHandler";
import { IUseCase } from "src/shared/protocols/use-case";

interface IRequest {
  checklistId: string;
}

@Injectable()
export class DeleteChecklist implements IUseCase<IRequest, string> {
  constructor(private readonly _checklistRepository: ChecklistRepository) { }

  async execute(companyInstance: CompanyInstance, data: IRequest): Promise<string> {
    const checklist = await this._checklistRepository.findById(companyInstance, data.checklistId);
    if (!checklist) {
      throw new ExceptionHandler({
        message: "Checklist não encontrado",
        status: HttpStatus.NOT_FOUND,
      })
    }

    await this._checklistRepository.delete(companyInstance, checklist);
    return "Checklist deleted";
  }

}