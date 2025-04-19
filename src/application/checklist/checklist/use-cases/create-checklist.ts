import { HttpStatus, Injectable } from "@nestjs/common";
import { EventService } from "src/application/event/service/event.service";
import { GetTrailersByWorkOrder } from "src/application/trailer/useCases/get-trailers-by-work-order";
import { CompanyInstance } from "src/core/company/company-instance";
import { Checklist } from "src/core/domain/entities/checklist/checklist";
import { ChecklistRepository } from "src/core/domain/repositories/checklist/checklist-repository";
import { ChecklistTemplateRepository } from "src/core/domain/repositories/checklist/checklist-template-repository";
import { WorkOrderRepository } from "src/core/domain/repositories/work-order-repository";
import { ChecklistStatusEnum } from "src/core/enum/checklist";
import { EventActionEnum } from "src/core/enum/event";
import { SubjectEnum } from "src/core/enum/subject.enum";
import { ExceptionHandler } from "src/core/exceptions/ExceptionHandler";
import { IUseCase } from "src/shared/protocols/use-case";
import { CreateChecklistItemsBatch } from "../../checklist-item/use-cases/create-checklist-item-batch";

interface IRequest {
  workOrderId: string;
  templateId: string;
  startedBy: string;
}

@Injectable()
export class CreateChecklist implements IUseCase<IRequest, Checklist> {
  constructor(
    private readonly _workOrderRepository: WorkOrderRepository,
    private readonly _checklistRepository: ChecklistRepository,
    private readonly _templateRepository: ChecklistTemplateRepository,
    private readonly _getTrailersByWorkOrder: GetTrailersByWorkOrder,
    private readonly _eventService: EventService,
    private readonly _createChecklistItemBatch: CreateChecklistItemsBatch
  ) { }

  async execute(companyInstance: CompanyInstance, checklist: IRequest): Promise<Checklist> {
    const template = await this._templateRepository.findById(companyInstance, checklist.templateId);
    if (!template) {
      throw new ExceptionHandler({
        message: "Template não encontrado",
        status: HttpStatus.NOT_FOUND
      })
    }

    const workOrder = await this._workOrderRepository.findById(
      companyInstance,
      checklist.workOrderId
    )
    if (!workOrder) {
      throw new ExceptionHandler({
        message: "Ordem de serviço não encontrada",
        status: HttpStatus.NOT_FOUND
      })
    }

    const workOrderAlreadyHasChecklist = await this._checklistRepository.findChecklistByWorkOrder(
      companyInstance,
      workOrder.id
    )
    if (workOrderAlreadyHasChecklist) {
      throw new ExceptionHandler({
        message: "Já existe um checklist iniciado para esta ordem de serviço",
        status: HttpStatus.BAD_REQUEST
      })
    }

    const trailers = await this._getTrailersByWorkOrder.execute(companyInstance, workOrder.id)
    if (!trailers) {
      throw new ExceptionHandler({
        message: "Não é possível iniciar o checklist sem que reboques estejam vinculados à frota",
        status: HttpStatus.NOT_FOUND
      })
    }

    const checklistToCreate = new Checklist({
      workOrderId: workOrder.id,
      templateId: checklist.templateId,
      startAt: new Date(),
      endAt: null,
      isCanceled: false,
      status: ChecklistStatusEnum.PENDING,
      createdAt: new Date(),
      updatedAt: new Date()
    })

    const createdChecklist = await this._checklistRepository.create(
      companyInstance,
      checklistToCreate
    )

    await this._createChecklistItemBatch.execute(companyInstance, {
      checklistId: createdChecklist.id,
      templateId: template.id,
    })

    const event = {
      event: EventActionEnum.Started,
      subject: SubjectEnum.Checklist,
      description: template.name,
      handledAt: new Date(),
      workOrderId: workOrder.id,
      handledById: checklist.startedBy,
      checklistId: createdChecklist.id
    }

    this._eventService.registerEvent(companyInstance, event);

    return createdChecklist;
  }
}