import { HttpStatus, Injectable } from "@nestjs/common";
import { CompanyInstance } from "src/core/company/company-instance";
import { ChecklistItem } from "src/core/domain/entities/checklist/checklist-item";
import { ChecklistItemRepository } from "src/core/domain/repositories/checklist/checklist-item-repository";
import { ExceptionHandler } from "src/core/exceptions/ExceptionHandler";
import { IUseCase } from "src/shared/protocols/use-case";

export interface IChangeChecklistConformityRequest {
  checklistItemId: string;
  isConform: boolean;
}

@Injectable()
export class ChangeChecklistItemConformity implements IUseCase<IChangeChecklistConformityRequest, ChecklistItem> {
  constructor(private readonly _checklistItemRepository: ChecklistItemRepository) { }

  async execute(companyInstance: CompanyInstance, data: IChangeChecklistConformityRequest): Promise<ChecklistItem> {
    const checklistItem = await this._checklistItemRepository.findById(companyInstance, data.checklistItemId);
    if (!checklistItem) {
      throw new ExceptionHandler({
        message: "Item de checklist não encontrado",
        status: HttpStatus.NOT_FOUND
      })
    }

    return await this._checklistItemRepository.changeConformity(
      companyInstance,
      data.checklistItemId,
      data.isConform
    );
  };

}