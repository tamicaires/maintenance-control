import { HttpStatus, Injectable } from "@nestjs/common";
import { CompanyInstance } from "src/core/company/company-instance";
import { ChecklistItem } from "src/core/domain/entities/checklist/checklist-item";
import { ChecklistItemRepository } from "src/core/domain/repositories/checklist/checklist-item-repository";
import { ChecklistRepository } from "src/core/domain/repositories/checklist/checklist-repository";
import { TrailerRepository } from "src/core/domain/repositories/trailer-repository";
import { ChecklistTemplateItemRepository } from "src/core/domain/repositories/checklist/checklist-template-item-repository";
import { ExceptionHandler } from "src/core/exceptions/ExceptionHandler";
import { GetTrailersByWorkOrder } from "src/application/trailer/useCases/get-trailers-by-work-order";
import { GetChecklistTemplateItemsByTemplateId } from "../../checklist-item-template/use-cases/get-checklist-item-by-template-id";

interface IRequest {
  checklistId: string;
  templateId: string;
}

@Injectable()
export class CreateChecklistItemsBatch {
  constructor(
    private readonly _checklistRepository: ChecklistRepository,
    private readonly _checklistRepositoryItem: ChecklistItemRepository,
    private readonly _getChecklistItemByTemplateId: GetChecklistTemplateItemsByTemplateId,
    private readonly _getTrailersByWorkOrder: GetTrailersByWorkOrder
  ) { }

  async execute(companyInstance: CompanyInstance, checklistData: IRequest): Promise<ChecklistItem[]> {
    const checklist = await this._checklistRepository.findById(companyInstance, checklistData.checklistId);
    if (!checklist) {
      throw new ExceptionHandler({
        message: "Checklist não encontrado",
        status: HttpStatus.NOT_FOUND
      });
    }

    if (checklist.isCanceled) {
      throw new ExceptionHandler({
        message: "Não é possível criar itens para checklist cancelado",
        status: HttpStatus.BAD_REQUEST
      });
    }

    const trailers = await this._getTrailersByWorkOrder.execute(
      companyInstance,
      checklist.workOrderId
    );

    const checklistItemsTemplate = await this._getChecklistItemByTemplateId.execute(
      companyInstance,
      checklistData.templateId
    )

    const checklistItemsToCreate = trailers.flatMap(trailer =>
      checklistItemsTemplate.map(templateItem => new ChecklistItem({
        checklistId: checklist.id,
        itemTemplateId: templateItem.id,
        trailerId: trailer.id,
        isConform: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      }))
    );

    return this._checklistRepositoryItem.createBatch(companyInstance, checklistItemsToCreate);
  }
}
