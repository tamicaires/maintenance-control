import { HttpStatus, Injectable } from "@nestjs/common";
import { EventService } from "src/application/event/service/event.service";
import { CompanyInstance } from "src/core/company/company-instance";
import { WorkOrderRepository } from "src/core/domain/repositories/work-order-repository";
import { EventActionEnum, EventDescriptionEnum } from "src/core/enum/event";
import { MaintenanceStatus } from "src/core/enum/maitenance-status.enum";
import { SubjectEnum } from "src/core/enum/subject.enum";
import { ExceptionHandler } from "src/core/exceptions/ExceptionHandler";
import { IFinishMaintenance } from "src/shared/types/work-order";

@Injectable()
export class FinishMaintenanceWorkOrder {
  constructor(
    private readonly _workOrderRepository: WorkOrderRepository,
    private readonly _eventService: EventService
  ) { }

  async execute(companyInstance: CompanyInstance, workOrderId: string, data: IFinishMaintenance): Promise<IFinishMaintenance> {
    const workOrder = await this._workOrderRepository.findById(companyInstance, workOrderId);
    if (!workOrder) {
      throw new ExceptionHandler({
        message: "Ordem de serviço não encontrada",
        status: HttpStatus.NOT_FOUND
      })
    }

    if (workOrder.status === MaintenanceStatus.Cancelada) {
      throw new ExceptionHandler({
        message: "Ordem de serviço cancelada não pode ser finalizada",
        status: HttpStatus.BAD_REQUEST
      })
    }
    if (workOrder.status === MaintenanceStatus.Finalizada) {
      throw new ExceptionHandler({
        message: "Ordem de serviço já finalizada",
        status: HttpStatus.BAD_REQUEST
      })
    }

    const finishMaintenanceData: IFinishMaintenance = {
      status: MaintenanceStatus.Finalizada,
      exitMaintenance: data.exitMaintenance,
      exitSupervisor: data.exitSupervisor
    }

    this._workOrderRepository.finishMaintenance(
      companyInstance,
      workOrder.id,
      finishMaintenanceData
    )

    const event = {
      event: EventActionEnum.Finished,
      subject: SubjectEnum.WaitingParts,
      description: EventDescriptionEnum.Finished_Maintenance,
      handledById: workOrder.userId,
      handledAt: new Date(),
      workOrderId: workOrder.id,
      companyId: companyInstance.getCompanyId(),
      fleetId: workOrder.fleetId
    }

    this._eventService.registerEvent(companyInstance, event);

    return finishMaintenanceData;
  }
}