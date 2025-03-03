import { HttpStatus, Injectable } from "@nestjs/common";
import { CompanyInstance } from "src/core/company/company-instance";
import { ChecklistItem } from "src/core/domain/entities/checklist/checklist-item";
import { ChecklistItemRepository } from "src/core/domain/repositories/checklist/checklist-item-repository";
import { ChecklistRepository } from "src/core/domain/repositories/checklist/checklist-repository";
import { TrailerRepository } from "src/core/domain/repositories/trailer-repository";
import { ExceptionHandler } from "src/core/exceptions/ExceptionHandler";

interface IRequest {
  checklistId: string;
  itemTemplateId: string;
  trailerId: string;
  isConform: boolean;
}

@Injectable()
export class CreateChecklistItem {
  constructor(
    private readonly _trailerRepository: TrailerRepository,
    private readonly _checklistRepository: ChecklistRepository,
    private readonly _checklistRepositoryItem: ChecklistItemRepository
  ) { }

  async execute(companyInstance: CompanyInstance, item: IRequest): Promise<ChecklistItem> {
    const trailer = await this._trailerRepository.findById(companyInstance, item.trailerId);
    if (!trailer) {
      throw new ExceptionHandler({
        message: "Não foi encontrado reboque vinculado.",
        status: HttpStatus.NOT_FOUND
      })
    }

    const checklist = await this._checklistRepository.findById(companyInstance, item.checklistId);
    if (!checklist) {
      throw new ExceptionHandler({
        message: "Checklist não encontrado",
        status: HttpStatus.NOT_FOUND
      })
    }

    if (checklist.isCanceled) {
      throw new ExceptionHandler({
        message: "Não é possivel criar items para checklist cancelados",
        status: HttpStatus.NOT_FOUND
      })
    }

    const checklistItem = new ChecklistItem({
      checklistId: item.checklistId,
      itemTemplateId: item.itemTemplateId,
      isConform: item.isConform,
      trailerId: item.trailerId,
      createdAt: new Date(),
      updatedAt: new Date(),
    })

    return this._checklistRepositoryItem.create(companyInstance, checklistItem);
  }
}