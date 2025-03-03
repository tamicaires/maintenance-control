import { HttpStatus, Injectable } from "@nestjs/common";
import { EventService } from "src/application/event/service/event.service";
import { CompanyInstance } from "src/core/company/company-instance";
import { WorkOrderRepository } from "src/core/domain/repositories/work-order-repository";
import { EventActionEnum, EventDescriptionEnum } from "src/core/enum/event";
import { MaintenanceStatus } from "src/core/enum/maitenance-status.enum";
import { SubjectEnum } from "src/core/enum/subject.enum";
import { ExceptionHandler } from "src/core/exceptions/ExceptionHandler";
import { IFinishWaitingParts } from "src/shared/types/work-order";

@Injectable()
export class FinishWaitingParts {
  constructor(
    private readonly _workOrderRepository: WorkOrderRepository,
    private readonly _eventService: EventService
  ) { }

  async execute(companyInstance: CompanyInstance, workOrderId: string, data: IFinishWaitingParts) {
    const workOrder = await this._workOrderRepository.findById(companyInstance, workOrderId);
    if (!workOrder) {
      throw new ExceptionHandler({
        message: "Ordem de serviço não encontrada",
        status: HttpStatus.NOT_FOUND
      })
    }

    if (workOrder.status !== MaintenanceStatus.AguardandoPeca) {
      throw new ExceptionHandler({
        message: "Ordem de serviço não está aguardando peças",
        status: HttpStatus.BAD_REQUEST
      })
    }

    const finisherData: IFinishWaitingParts = {
      status: data.status,
      endWaitingParts: data.endWaitingParts
    }

    await this._workOrderRepository.finishWaitingParts(
      companyInstance,
      workOrder.id,
      finisherData
    );

    const event = {
      event: EventActionEnum.Finished,
      subject: SubjectEnum.WaitingParts,
      description: EventDescriptionEnum.Finished_Waiting_Parts,
      handledById: workOrder.userId,
      handledAt: new Date(),
      workOrderId: workOrder.id,
      companyId: companyInstance.getCompanyId(),
      fleetId: workOrder.fleetId
    }

    this._eventService.registerEvent(companyInstance, event);

    return finisherData;
  }
}